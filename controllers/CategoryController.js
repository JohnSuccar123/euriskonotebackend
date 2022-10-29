const Mycategorylist = require('../Models/CategoryModel')
const { categoryJoiSchema } = require('../JoiSchema/SchemaJoiValidation')



const CreateCategory = async (req, res, next) => {
    var categorymessage = "The Category has been successfully created, here are the details:"
    try{
        const { error } = categoryJoiSchema.validate(req.body)
        if(error) {
            res.status(400).json({
                message: error.details[1].message
            })
        }
        else {
            let mycategory = new Mycategorylist({
                name: req.body.name,
               
                
            }) 
            let categorycheck = await Mycategorylist.findOne({name: req.body.name})
           
            if(categorycheck) {
                res.status(400).json({
                    message: "Category already exists"
                })
            }
            else {
            mycategory.save()    
            res.send({categorymessage, mycategory})  
        } }
    }
    catch(error) {
        res.status(420).json({
        message: "The minimum length for the category name is 3 and the maximum is 50, try again ! :)"
        })
    }
    
}

const UpdateCategories = async (req, res, next) => {
    let categoryID = req.body.categoryID
    let updatedData = {
        name: req.body.name,
      
    }
    try {
        await Mycategorylist.findByIdAndUpdate(categoryID, {$set: updatedData})
        res.json({
            message: 'Category has been updated successfully!'
        })        
    } catch (error) {
        res.json({error})
    } }

    const DeleteCategory = async (req, res, next) => {
        let categoryID = req.body.categoryID
        try {
            await Mycategorylist.findByIdAndRemove(categoryID)
            res.json({
                message: 'Category Deleted Successfully'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error
            });
        }
    }

    
    const RetrieveCategories = async (req, res, next) => {
        try{
            const categories = await Mycategorylist.find()
            if(categories.length === 0) {
                res.json({
                    message: "No Categories Found, please create category"
                })
            } else {
                res.json({
                    categories
                })
            }
        }
        catch(error){
            res.status(500).json({
                message:'An Error Occured!'
            });
        }
    }

module.exports = { RetrieveCategories, CreateCategory, UpdateCategories, DeleteCategory }