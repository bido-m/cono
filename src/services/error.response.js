export const badRequest = ({
    res,
    err=undefined
}={})=>{
    res.status(400).json({message:"Something wrong",err})
}

export const Unauthorized = ({
    res
}={})=>{
    res.status(401).json({message:"invalid credentials"})
}

export const Forbidden = ({
    res,
    err=undefined
}={})=>{
    res.status(403).json({message:"Forbidden account",err})
}

export const notFound = ({
    res
}={})=>{
    res.status(404).json({message:"Data not found"})
}

export const conflict = ({
    res,
    message=undefined
}={})=>{
    res.status(409).json({message})
}

export const serverErr = ({
    res,
    err=undefined
}={})=>{
    res.status(500).json({message:"Internal Server Error",err})
}