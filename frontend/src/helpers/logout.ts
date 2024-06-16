

export const logout = async (item:string) => {
  // console.log(item)

  if(sessionStorage.getItem(item) === null){
    return {
      success: false,
      message: `El item: ${item} no se encuentra dentro del Session Storage ❌`
    }  
  }

  sessionStorage.removeItem(item);
  return {
    success: true,
    message: `El item: ${item} fue removido con exito del Session Storage ✅`
  }
}