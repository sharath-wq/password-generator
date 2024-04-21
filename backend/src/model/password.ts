import mongoose from 'mongoose';

// Interface that describe the properties for creating a user
interface PasswordAttrs {
    userId: string;
    name: string;
    password: string;
}

// Interface that describes the properties that user model has
interface PasswordModel extends mongoose.Model<PasswordDoc> {
    build(attrs: PasswordAttrs): PasswordDoc;
}

// Interface that describes that a properite a user document has
interface PasswordDoc extends mongoose.Document {
    userId: string;
    name: string;
    password: string;
}

const passwordSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

passwordSchema.statics.build = (attrs: PasswordAttrs) => {
    return new Password(attrs);
};

const Password = mongoose.model<PasswordDoc, PasswordModel>('Password', passwordSchema);

export { Password };
