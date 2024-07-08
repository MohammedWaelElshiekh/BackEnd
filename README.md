# Imaging API BackEnd

This backend was developed to save developers time and fill the gaps of the images in websites prototyping.
This api provides you with a placeholder image that is generated once and saved on the browser cache for better performance. The api requires passing the width and height and image color to generate the required placeholder image

# how to use
using the api to generate custom images

Sample URL: "http://localhost:3000/generatePlaceholder?h=100&w=100&c=blue"
> the **"h"** parameter stands for the **height** of the image <br/>
> the **"w"** stands for the width of the images <br/>
> the **"c"** parameter stands for the color of the image <br/>

The api will return an image of type png, make sure that you have configured the your code correcly to use it most effeciently

### build with node v20.15.0 lts/iron