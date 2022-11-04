import { ref } from "vue";
// pinia
import { useLoadingState, useSearchState } from "@/store/store";
// composables
import { useComfirmSwal, useResultSwal } from "@/composables/useAlert";
import { useGetApiResult } from "@/composables/useApi";

export const useFavoriteSearchActions = () => {
    const { changeLoadingState } = useLoadingState();

    const { searchInfo } = useSearchState();
    const applyConditions = (conditions) => {
        searchInfo.inputName = conditions.name;
        searchInfo.selectComparisonOperator = conditions.operator;
        searchInfo.inputAge = conditions.age;
        searchInfo.selectGender = conditions.gender;
    };

    const favorites = ref([]);
    const getFavorites = async () => {
        const result = await useGetApiResult("favorites", "readFavorites");
        favorites.value = [...result];
    };
    getFavorites();

    const isOpen = ref(false);
    const favoriteName = ref("");
    const addFavorite = async () => {
        if (favoriteName.value === "") {
            useResultSwal({ title: "favorite name is empty", icon: "error" });
            return;
        }

        const {
            inputName: name,
            inputAge: age,
            selectComparisonOperator: operator,
            selectGender: gender,
        } = searchInfo;

        const parameter = {
            name: favoriteName.value,
            conditions: { name, age, operator, gender },
        };

        try {
            changeLoadingState(1);
            const data = await useGetApiResult("favorites", "addFavorite", parameter);
            if (data.status === "ok") {
                useResultSwal({ title: "add favorite success" });
                getFavorites();
                favoriteName.value = "";
                isOpen.value = false;
            } else {
                useResultSwal({ title: "add favorite failed", icon: "error" });
            }
        } catch (error) {
            useResultSwal({ title: "add favorite failed", icon: "error" });
        } finally {
            changeLoadingState(0);
        }
    };

    const deleteFavorite = async (favorite) => {
        const check = await useComfirmSwal({
            title: `sure to delete ${favorite.name} favoriteItem ?`,
        });
        if (!check) return;

        try {
            changeLoadingState(1);
            const data = await useGetApiResult("favorites", "deleteFavorite", { id: favorite.id });
            if (data.status === "ok") {
                useResultSwal({ title: "delete favorite success" });
                getFavorites();
            } else {
                useResultSwal({ title: "delete favorite failed", icon: "error" });
            }
        } catch (err) {
            useResultSwal({ title: "delete favorite failed", icon: "error" });
        } finally {
            changeLoadingState(0);
        }
    };

    return {
        favorites,
        isOpen,
        favoriteName,
        applyConditions,
        addFavorite,
        deleteFavorite,
    }
}