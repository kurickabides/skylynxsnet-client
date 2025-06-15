# Skylynx Network
> Client Website for Skylynx Network.
> The website will
> This client app will also have a moblie version.

## What is the Skylynx Network

> It is th base website for all payment processing and user registration all other sites talk to it's services
## Setup GITHub repo 

- Initialize Git (if not already done):
``` bash
 git init

```
- Add the remote GitHub repo:
a main branch on the git hub server the attach to that branch for dev
``` bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

example for this repo

``` bash
git add .
git commit -m "Initial commit Main branch"
git remote add origin https://github.com/kurickabides/skylynxsnet-client.git
git push -u origin main
```

## Design
- App
    - Layout
      - Header
        - User image
        - Meta Mask Connect
        - Meta Mask Disconnect
        - Network Connected
    - Navigation
      - Pages...
    - Footer
### Css design
>Material UI - look up 

```
<Card className={classes.root}>
  <CardContent >
<typography>
</CardContent >
</Card>
```
## Docker
> This project will build client docker repo for different platforms. This section will cover how to deploy to 

> Fine correct ec2 image for aws

### Dev Depoly
> Use the Docker compose to start the dev server and then you can make changes in vsCode.

```
docker-compose -f docker-compose-dev.yml up --build
```

> To stop the container 

```
docker-compose -f docker-compose.yml -f docker-compose-dev.yml down
```
### Build for Deploy
> This section will cover how to build the production docker image that will be deployed in the follwing steps

```
docker-compose -f docker-compose.yml -f docker-compose-prod.yml up -d --build
```
### AWS Hosting Depoly
> This section will cover how to deploy to a aws cloud server using the cli

> Below are a list of permsions that must ne set for the aws role
> AWS uses a fine-grained permission model, with specific role for each resource type and operation.

> To ensure that Docker ECS integration is allowed to manage resources for your Compose application, you have to ensure your AWS credentials grant access to following AWS IAM permissions:

```
docker context create ecs cryptorio-web
```

After creating context
> Create a Docker context using: AWS secret and token credentials
Retrieve or create AWS Access Key and Secret on https://console.aws.amazon.com/iam/home>#security_credential
> AWS Access Key ID
> Enter AWS Secret Access Key

> Create a Docker context using: AWS secret and token credentials
Retrieve or create AWS Access Key and Secret on https://console.aws.amazon.com/iam/home>#security_credential
> AWS Access Key ID AKIAZJ56VRQ476VGSC5M
> Enter AWS Secret Access Key ****************************************
> Region us-east-1
Successfully created ecs context "cryptorio-web"
### DyFY Deploy
> This section will cover how to deploy to a cryto cloud server

## Test Depoly
>It’s generally harder to manage and store volumes due to lacking a human-readable identifier. Since Docker creates them automatically, it’s common to use anonymous volumes for temporary storage. They can also appear if you don’t specify a named volume when creating a container.
but first run the docker-compose-test to build the ngix image then use that imag to host the complied website


To create a container with an anonymous volume, run:
```
docker run -v /data nginx
```
