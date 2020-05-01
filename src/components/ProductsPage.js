import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.7em;
  text-align: center;
  color: rgb(250, 179, 51);
`;
const Spam = styled.span`
  color: rgb(29, 155, 76);
`;

const Card = styled.div`
  // display: flex;
  // flex-direction: column;
  border: 2px solid rgb(42, 42, 42);
`;

export default function ProductsPage() {
  const token = localStorage.getItem("userId");
  console.log(token);
  const [itemsForSale, setItemsForSale] = useState([]);
  useEffect(() => {
    axiosWithAuth()
      .get(
        "https://bw-african-marketplace-lucas.herokuapp.com/api/market/items"
      )
      .then((res) => {
        console.log(res);
        setItemsForSale(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const deleteHandler = (id) => {
  //     axiosWithAuth()
  //         .delete(`https://bw-african-marketplace-lucas.herokuapp.com/api/market/items/${id}`)
  //         .then(res => {
  //             console.log(res)
  //         })
  //         .catch(err => {
  //             console.log(err)
  //         })
  // }

  return (
    <div>
      <Title>
        Welcome to African <Spam>Marketplace</Spam>
      </Title>
      {itemsForSale.map((item) => {
        return (
          <Card key={item.id}>
            <p>Location: {item.location}</p>
            <p>Name: {item.name}</p>
            <p>Seller: {item.owner}</p>
            <p>{item.price}</p>
            {/* <button onClick={() => {
                        deleteHandler(item.id)
                    }}>Delete Item</button> */}
          </Card>
        );
      })}
    </div>
  );
}
