import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Progress } from 'antd';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'config/Firebase';
import axios from 'axios';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'


const initialState = {
  name: "",
  category: "",
  price: "",
  color: "",
  size: '',
  stock: "",
  description: "",
  images: [],
  // time:'',
}

export default function AddProducts() {
  // for image
  const [images, setImages] = useState([]);
  // for content
  const [state, setState] = useState(initialState)
  const [imageLoading, setImgLoading] = useState(false)
  const [imageProgress, setImageProgress] = useState(0)

  const [isProcessing, setisProcessing] = useState(false)


  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      let file = e.target.files[0]

      const fileExt = file.name.split('.').pop();
      const imagesRef = ref(storage, `images/${window.getRandomId()}.${fileExt}`)
      const uploadTask = uploadBytesResumable(imagesRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          setImgLoading(true)
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setImageProgress(progress)
          // setTimeout(() => {
          //   setImgLoading(false)
          // }, 1000);
          console.log(progress);
        },
        (error) => {
          window.toastify(error.message + "usman", "error")
          setImgLoading(false)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setImgLoading(false)
              setImages([...images, downloadURL])
            }).catch((error) => {
              window.toastify("Something went wrong in updating name or profile photo", "error")
            });
          setImgLoading(false)
        }
      );

    }
  }


  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }));
  }
  // console.log('e.target', e.target)
  // ----------Handle Submit---------

  const handleSubmit = async (e) => {
    e.preventDefault();
    state.images = images

    try {
      await axios.post("http://localhost:5000/api/products/add", state)
        .then((res) => {
          console.log(res);
          window.toastify(res.data.message, "success")
          setState(initialState)
        })
    } catch (error) {
      window.toastify(error.response.data.error, "error")
    }


  }

  return (
    <>
      <div className="container  py-3">
        <div className="row">
          <div className="col-12">
            <h5>Add Products</h5>
            <p className='fw-semibold'><Link className='text-decoration-none text-secondary'>Dashboard</Link> / <Link className='text-decoration-none text-dark'>Add Products</Link></p>
          </div>
        </div>
        <div className="row px-lg-4">

          <div className="col-12 col-lg-8  mt-4  ">
            <div className="card  border-0 px-2 px-lg-4 py-3">
              <form onSubmit={handleSubmit}>
                <div className="row pt-2 ">
                  <div className="col-12 col-lg-6">
                    <label for="name" className='fw-semibold py-2'>Name</label>
                    <input type="text" name='name' className='form-control py-2' placeholder='name' value={state.name} onChange={handleChange} required />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label for="title" className='fw-semibold py-2'>Category</label>
                    <input type="text" name='category' className='form-control py-2' placeholder='category' value={state.category} onChange={handleChange} required />
                  </div>
                </div>
                <div className="row pt-2 ">
                  <div className="col-12 col-lg-6">
                    <label for="type" className='fw-semibold py-2'>Price</label>
                    <input type="text" name='price' className='form-control py-2' placeholder='Type' value={state.price} onChange={handleChange} required />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label for="catetory" className='fw-semibold py-2'>Color</label>
                    <input type="color" name='color' className='form-control py-2' placeholder='Catetory ' value={state.color} onChange={handleChange} required />
                  </div>
                </div>
                <div className="row pt-2 ">
                  <div className="col-12 col-lg-6">
                    <label for="slug" className='fw-semibold py-2'>Size</label>
                    <input type="text" name='size' className='form-control py-2' placeholder='Medium or small' value={state.size} onChange={handleChange} required />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label for="stock" className='fw-semibold py-2'>Stock</label>
                    <input type="number" name='stock' className='form-control py-2' placeholder='Stock ' value={state.stock} onChange={handleChange} required />
                  </div>
                </div>

                <div className="row py-2">
                  <div className="col-12">
                    <label for="description" className='fw-semibold py-2'>Description</label>
                    <textarea rows='4' type="text" name='description' className='form-control py-2' placeholder='Add The Description' value={state.description} onChange={handleChange} required />
                  </div>
                </div>
                <div className="row py-2">
                  <button className='btn btn-primary w-50 mx-auto' disabled={isProcessing}>
                    {!isProcessing ? "Add Product" : <div className='spinner spinner-border spinner-border-sm'></div>}

                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-12 col-lg-4  mt-4">
            <div className="card border-0 px-4 py-3 text-center  align-items-center">

              <Avatar
                className="text-center my-3"
                size={150}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                alt="Default Avatar"
              />
              <input type="file" className='form-control' onChange={handleImageChange} required />
              <Progress percent={imageProgress} />
              {imageLoading && <div className="spinner-border spinner-border-sm"></div>}

              {/* <button className='btn mt-3 btn-primary'>Upload</button> */}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}