export const generatepErrorInfo = (p) =>{ 
return `One or more properties were incomplete or invalid  
        List of required Properties:
        
       -- Name : needs String, get ${p.name}
       -- description : needs String, get ${p.description}
       -- price : needs Number, get ${p.price}
       -- image : needs String, get ${p.image}
       -- category : needs String, get ${p.category} `
}
