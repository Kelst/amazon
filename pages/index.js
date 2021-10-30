import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography,Button } from '@material-ui/core'
import Layout from '../components/Layout'
import data from '../utils/data'
import NextLink from "next/link"


export default function Home() {
  return (
    <Layout>
      <div >
      <h1>
        Products
      </h1>
      <Grid container spacing={3}>
        {data.products.map((product)=>{
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
                  <Button size="small" color="primary">
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
