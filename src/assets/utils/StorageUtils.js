
let getStorage =(key,isSession=false)=>{

    let res=null;

    if(isSession){

        res = sessionStorage.getItem(key)

    }else{

       res = localStorage.getItem(key)
    }

    return res==null?[]:JSON.parse(res)

}
let setStorage =(key,value=[],isSession=false)=>{

    if(isSession){

        sessionStorage.setItem(key,JSON.stringify(value))
    }

    localStorage.setItem(key,JSON.stringify(value))

}

let removeStorage=(key,isSession=false)=>{

    if(isSession){

        sessionStorage.removeItem(key)
    }
    localStorage.removeItem(key)
}

export default {

    getStorage,
    setStorage,
    removeStorage

}
