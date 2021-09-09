module.exports =async function homeSignUpPostController(req,res) {
    try{
            const data =  await SignUpValidation.validateAsync(req.body);
            // console.log(data);
            let user = await req.db.users.findOne({
                email: data.email.toLowerCase(),
            });
    
            if(user) throw new Error("Email already exists")   // kodni shu qismida otvoradi bundan keyingi qismi ishlamayadi errorni keyin catch bilan ushlab oladi
    
            user = await req.db.users.insertOne({
                ...data,
                password: await generateCrypt(data.password)
            });
            console.log(user)
            res.redirect("/login.html");
        }
        catch(error){
            // console.log(error);
            res.render("register",{
                error,
            });
        }
    }

