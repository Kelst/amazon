import { Link, ListItem, Typography ,Card,List,Button} from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import React, { useContext } from 'react';
import { Store } from '../../utils/Store';
import Layout from '../../components/Layout';
import NextLink from "next/link"
import useStyles from '../../utils/styles';
import { Grid } from '@material-ui/core';
import Image from "next/image"
import db from '../../utils/db'
import Product from "../../models/Product"
const axios = require('axios').default;
export default function ProductScreen({product}) {
    const classes=useStyles()
    const router=useRouter()
    const {slug}=router.query
    const {state,dispatch}=useContext(Store);
    const {cart}=state
    if(!product){
        return <div>
            Product Not Found
        </div>
    }
    const addToCartHandler= async()=>{
      const {data}=await axios.get(`/api/products/${product._id}`);
      if(data.countInStock<=0){
        alert("Sorry product is out of stock")
      }
      dispatch({type:"CART_ADD_ITEM",payload:{...product,quantity:1}})
    }
  return (
    <div>
        <Layout title={product.name}  description={product.description} >
            <div className={classes.section}><NextLink href="/" passHref>
                <Link>back to products</Link>
            </NextLink></div>
            <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                    <Image
                    src={product.image}
                    alt={product.name}
                    width={640}
                    height={640}
                    layout="responsive"
                    >

                    </Image>

                </Grid>
                <Grid item md={3} xs={12}>
                <ListItem><Typography component="h1" variant="h1">{product.name}</Typography></ListItem>
                <ListItem>Category:{product.category}</ListItem>
                <ListItem>Brand:{product.brand}</ListItem>
                <ListItem>Raring:{product.rating} stars ({product.numReviews} rewies)</ListItem>

            </Grid>

            <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
            </Grid>
            
        </Layout>

    </div>
  );
}
export async function getServerSideProps(context){
  const {params}=context;
  const {slug}=params
  await db.connect()
  const products=await Product.findOne({slug}).lean();
  await db.disconnect();
  return {
    props:{

    product:db.convertDocToObj(products)

    }
  }
}
