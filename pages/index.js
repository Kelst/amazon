import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography,Button } from '@material-ui/core'
import Layout from '../components/Layout'
import NextLink from "next/link"
import db from '../utils/db'
import Product from "../models/Product"
import axios from 'axios'
import { Store } from '../utils/Store';
import React, { useContext } from 'react';

export default function Home(props) {
  const axios = require('axios').default;
  const {state,dispatch}=useContext(Store);
  const {products}=props
  const addToCartHandler= async()=>{
    const {data}=await axios.get(`/api/products/${product._id}`);
    if(data.countInStock<=0){
      alert("Sorry product is out of stock")
    }
    dispatch({type:"CART_ADD_ITEM",payload:{...product,quantity:1}})
  }
  return (
    <Layout>
      <div >
      <h1>
        Products
      </h1>
      <Grid container spacing={3}>
        {products.map((product)=>{
          return <Grid item md={4} key={product.name}>
            <Card>
            <NextLink href={`/product/${product.slug}`} passHref>
              <CardActionArea>
                <CardMedia 
                component="img"
                 image={product.image}
                 title={product.name}
                />
                
                <CardContent>
                  <Typography>
                    {product.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
              </NextLink>
              <CardActions>
                <Typography>
                  ${product.price}
                  <Button size="small" color="primary" onClick={addToCartHandler}>
                    Add to Cart
                  </Button>
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        })}

      </Grid>
      
    </div>
    </Layout>
    
  )
}


export async function getServerSideProps(context){
  await db.connect()
  const products=await Product.find({}).lean();
  await db.disconnect();
  return {
    props:{

    products:products.map(db.convertDocToObj)

    }
  }
}
