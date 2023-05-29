# Client Side JavaScript for Showing Advertisements and Tracking Visitors

In order to start showing the advertisements on the provider's website, the owner of the website first needs to include JavaScript, which will read data from the blockchain.

Please make sure to include the following code in your HTML:

```html
<html>
    <head>
        ...
    </head>
    <body>
        <!-- ad -->
        <div id="web3_ad"></div>
        ...
        <script src="web3.min.js"></script>
        <script src="script.js"></script>
    </body>
    >
</html>
```

The 1. thing the owner needs to do is define a **\<div>** element with id **web3_ad**.

Then the owner needs to include 2 JavaScript files at the end of the **\<body>** tag:

-   **web3.min.js** allows for communication with the blockchain and is a standard library
-   **script.js** interacts with our smart contracts in order to get relevant information about advertisements
