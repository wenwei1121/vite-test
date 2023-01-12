export const useCheckInputAction = (checkArr, memberInfo) => {
  const { id = 0, name, age = 0 } = memberInfo

  if (!name) return "Have empty name"

  if (age === "") return "Have empty age"

  const haveSameName = checkArr.value.some(
    ({ id: memberId, name: memberName }) => {
      if (memberId === id) return ""
      return memberName === name
    }
  )
  if (haveSameName) return "Have same name"

  return ""
}
