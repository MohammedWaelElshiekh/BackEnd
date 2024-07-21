# image-processing-web-app-Backend

#### FrontEnd used with this backend: [Front-End](https://github.com/MohammedWaelElshiekh/FrontEnd)

This backend was developed to save developers time and fill the gaps of the images in websites prototyping.
This api provides you with a placeholder image that is generated once and saved on the browser cache for better performance. The api requires passing the width and height and image color to generate the required placeholder image

# How to use
first, you need to download the backend and frontend of the project, you can fint the frontenf [here](https://github.com/MohammedWaelElshiekh/FrontEnd). then you should start the orject using the backend server using ``` npm run start ``` and open the ``` index.html ``` from the frontend folder in your browser.

# how it works
There are 4 main endpoints of the application: 
- resizeImage
- generatePlaceholder
- library 
- public.

### resinzing image
you can use the endpoint "/resizeImage" using the POST method to resize an image send in a form data especially in an input named image. you should provide
here is a sample code of requesting an image resiaing:
```
fetch("http://localhost:4000/ResizeImage", { // the endpoint
    method: "POST",
    body: formData, // the data of the html form collected in a FormData object
  }).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      document.getElementById("previewImage").setAttribute("src", data.url);
      document.getElementById("url").innerText = data.url;
      refreshGallery();
    } else {
      alert("Error: " + data.err + " Code:" + response.status);
    }
  });

```
the structure of the html form used with this code:
```
<form id="uploadForm" enctype="multipart/form-data" method="post">
  <span class="select-image">
    <label for="image">Select an image to resize:</label>
    <input type="file" name="image" id="image" />
  </span>
  <span class="inputs">
    <label for="height">The new height</label>
    <input required type="number" name="height" id="height" />
  </span>
  <span class="inputs">
    <label for="width">The new width</label>
    <input required type="number" name="width" id="width" />
  </span>
  <span class="buttons">
    <button type="reset">Clear</button>
    <button type="button" id="submitButton">Resize Image</button>
  </span>
</form>

```

> there is also a functionality to choose an image from a gallery of images by sending the image name to the server in a filed ```selectedImage``` in the sent form data.

### fethcing resized image
the resizeImage endpoint return a ```url``` property that contains the url of the resized image.
the url that will be ruturn will look loke this **"image1.jpg-50x30.jpg"** and the url that will be ruturn will look **"http://localhost:3000/public/resizedImages/image1.jpg-50x30.jpg"**

> the endpoint ```/library``` will return a list of all available original images on the server.
> you can use this list to fetch the imges and show it in a gallery

## Project File Structure
```
.
|
├── package.json
├── package-lock.json
├── public
│   ├── cachedImagesOnServer
│   │   └── blue-1000-1000.png
│   ├── library
│   │   ├── image1.jpg
│   │   ├── image2.jpg
│   │   ├── image3.jpg
│   │   ├── image4.jpg
│   │   ├── image5.jpg
│   │   ├── Screenshot from 2024-07-01 03-54-15.png
│   │   └── test-image.jpg
│   └── resizedImages
│       ├── image1.jpg
│       └── test-image.jpg-200x300.jpg
├── README.md
├── spec
│   ├── support
│   │   └── jasmine.json
│   └── tests
│       ├── helpers
│       │   ├── images
│       │   │   └── test-image.jpg
│       │   └── reporter.ts
│       ├── library.ts
│       ├── resizingImage.ts
│       ├── server.ts
│       └── spec.ts
├── src
│   ├── constants.ts
│   ├── index.ts
│   ├── routes
│   │   ├── index.ts
│   │   ├── library
│   │   │   └── index.ts
│   │   ├── placeholderGenerator
│   │   │   └── index.ts
│   │   └── resize
│   │       └── index.ts
│   └── utilities
│       ├── resizeSaveImage.ts
│       ├── savingImage.ts
│       └── validateImages.ts
├── tree.txt
├── tsconfig.json
└── uploads
    └── fe01de09f1322e191cd0d01fa3a26ac4

```


### Remarks
#### Used packages in this project:
 - CORS
 - Express
 - Jasmine
 - Multer
 - Prettier
 - jasmine-spec-reporter
 - nodemon
 - supertest
 - ts-node
 - typescript
 - body-parser
 - sharp

### built with node v20.15.0 lts/iron
