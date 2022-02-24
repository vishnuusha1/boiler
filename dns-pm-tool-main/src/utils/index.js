module.exports = {
    validateJoi:({baseSchema, data={}, next, options={}})=>{
        const result = baseSchema.validate(data, {
            ...{
                abortEarly:false,
                allowUnknown:false,
                convert:true
            },
            ...options
        });
        if(result.error){
            return next(result.error);
        }
        return next();
    }
}