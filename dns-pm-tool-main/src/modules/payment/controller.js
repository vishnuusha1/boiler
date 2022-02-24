
module.exports = {
    list:(req,res) =>{
        //const list = await service.list();
        //res.json(list);
        res.send("list");
    },
    create:(req,res) =>{
        res.send("create");
    }
}
