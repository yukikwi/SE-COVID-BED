
**This folder is for mongodb document model**

  

> Example
> 
>     import mongoose, { Document, model, Model, Schema } from "mongoose"
>     
>       
>     
>     export interface ..name..Interface extends Document {
>     
>     variable1: datatype
>     
>     variable2: string
>     
>     }
>     
>       
>     
>     const ..name..Schema: Schema = new Schema({
>     
>     variable1: {
>     
>     type: datatype
>     
>     },
>     
>     reference variable2: {
>     
>     type: Schema.Types.ObjectId,
>     
>     ref: reference collection
>     
>     }
>     
>     })
>     
>       
>       
>     
>     export const Post: Model<..name..Interface> = mongoose.models...name.. || model("..name..", ..name..Schema)
