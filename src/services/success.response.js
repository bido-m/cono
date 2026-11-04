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