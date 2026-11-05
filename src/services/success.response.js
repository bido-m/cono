export const successCreate =({
    res,
    data=undefined
}={})=>{
 res.status(201).json({message:"Created Successfully",data})
}

export const successLogged =({
    res,
    token=undefined
}={})=>{
 res.status(200).json({message:"Logged in Successfully",token})
}

export const successFetch = ({
    res,
    data=undefined
}={})=>{
    res.status(200).json({message:"Data fetched Successfully",data})
}

export const successUpdate = ({
    res,
    data=undefined
}={})=>{
    res.status(200).json({message:"Data updated Successfully",data})
}

export const successDelete = ({
    res
}={})=>{
    res.status(200).json({message:"Data deleted Successfully"})
}