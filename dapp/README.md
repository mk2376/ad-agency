# Ad-Agency DAPP

## Instructions

Run the development server:

```bash
make run
```

Deploy:

```bash
make build-deploy
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## File structure

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## IPFS Image Upload

Head to **/ipfs** to try out image upload to IPFS.
Before use Infura **API_KEY** and **API_KEY_SECRET** need to be put inside folder **secret.js**.

Demonstration:
![IPFS Image Upload Demo](../assets/img/ipfs_image_upload.gif)
