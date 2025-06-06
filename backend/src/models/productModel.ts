import mongoose, { Schema } from 'mongoose';

interface IImage {
  fileName: string;
  originalName: string;
}

interface IProduct {
  title: string;
  image: IImage;
  category: string;
  description?: string;
  price?: number | null;
}

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    unique: true,
    required: [true, "Поле 'title' обязательно"],
    minlength: [2, "Минимальная длина 'title' - 2 символа"],
    maxlength: [30, "Максимальная длина 'title' - 30 символов"],
  },
  image: {
    type: { fileName: String, originalName: String },
    required: [true, "Поле'image' обязательно"],
  },
  category: {
    type: String,
    required: [true, "Поле 'category' обязательно"],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: null,
  },

}, { versionKey: false });

export default mongoose.model<IProduct>('Product', productSchema);
