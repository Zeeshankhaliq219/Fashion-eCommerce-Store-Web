import React, { useEffect, useState } from 'react'
import { Steps } from 'antd';
import { firestore } from 'config/Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { useParams } from 'react-router-dom'
import moment from 'moment';

export default function OrderDetail() {
  const [document, setDocument] = useState({})
  const { orderId } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
    gettingData()
  }, [])

  const gettingData = async () => {
    try {
      const q = query(collection(firestore, "Orders"), where("order_Id", "==", orderId));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setDocument(doc.data())
      });
    } catch (e) {
      window.toastify("Something went wrong", "error")
    }
  }



  return (
    <>
      <div className="container-fluid bg-success" id='order-detail'>
        <div className="container text-white">
          <h3 className=''>The Delivery Date Will Be On {moment().add(1, "week").format('MMMM Do YYYY, h:mm:ss a')}</h3>
        </div>
      </div>

      <div className="container py-5" >
        <h2 className='fw-bold text-success my-4'>Order Detail</h2>
        <div className="row g-2 py-2 py-md-5">
          <div className="col">
            <Steps
              direction="vertical"
              current={1}
              items={[
                {
                  title: 'Waiting',
                  description: "Please wait! Your order is not in progress yet.",
                },
                {
                  title: 'In Progress',
                  description: "Your order is in progress",
                },
                {
                  title: 'Delivered',
                  description: "Your order is delivered",
                },
              ]}
            />

          </div>
          <div className="col-12 col-md-8 mt-5 mt-md-0 px-3">
            <h5><u>Reciever's Detail</u></h5>
            <div className="row mt-4">
              <div className="col">
                <div className="text-success fw-bold">Full Name</div>
                <div className="text-secondary">{document.fullName}</div>
              </div>
              <div className="col">
                <div className="text-success fw-bold">Order ID</div>
                <div className="text-secondary">{document.order_Id}</div>
              </div>
            </div>

            <div className="row my-3">
              <div className="col">
                <div className="text-success fw-bold">Email</div>
                <div className="text-secondary">{document.email}</div>
              </div>
              <div className="col">
                <div className="text-success fw-bold">Phone Number</div>
                <div className="text-secondary">{document.phone}</div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="text-success fw-bold">Date</div>
                <div className="text-secondary">{document.dateCreated}</div>
              </div>
              <div className="col">
                <div className="text-success fw-bold">Payment Method</div>
                <div className="text-secondary">{document.payment_method}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
