

const sendrole = async(req, res) => {
    const r = req.user.role;
    if(!r){
        return res.status(200).json({message : "no role"});
    }

    console.log(role);
    return res.status(200).json({role : r});
}

export {sendrole}