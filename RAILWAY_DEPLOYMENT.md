# Railway Deployment Guide for InstantCoder-MCP

This guide provides step-by-step instructions for deploying InstantCoder-MCP to Railway.

## Prerequisites

1. A [Railway](https://railway.app/) account
2. A [Google AI Studio API key](https://aistudio.google.com/app/apikey)
3. A GitHub account with access to the InstantCoder-MCP repository

## Deployment Steps

### 1. Fork or Clone the Repository

If you haven't already, fork the InstantCoder-MCP repository to your GitHub account:
```
https://github.com/vredrick2/InstantCoder-MCP
```

### 2. Sign Up for Railway

If you don't have a Railway account, sign up at [railway.app](https://railway.app/).

### 3. Create a New Project

1. Log in to your Railway dashboard
2. Click "New Project"
3. Select "Deploy from GitHub repo"

### 4. Connect Your GitHub Repository

1. Connect your GitHub account if you haven't already
2. Select the InstantCoder-MCP repository from the list
3. Railway will automatically detect the Dockerfile and railway.json configuration

### 5. Configure Environment Variables

Add the following environment variables in the Railway dashboard:

- `GOOGLE_AI_API_KEY`: Your Google AI Studio API key
- `NODE_ENV`: Set to `production`

### 6. Add a PostgreSQL Database (Optional)

If you want to enable saving generated apps:

1. Click "New" and select "Database" → "PostgreSQL"
2. Railway will automatically add the database connection variables to your project

### 7. Deploy Your Application

1. Click "Deploy" to start the deployment process
2. Railway will build and deploy your application using the Dockerfile
3. Once deployed, Railway will provide you with a public URL to access your application

### 8. Monitor Your Deployment

1. Navigate to the "Deployments" tab to monitor the deployment process
2. Check logs for any errors or issues
3. Once the deployment is successful, you can access your application using the provided URL

## Troubleshooting

### Database Connection Issues

If you encounter database connection issues:

1. Verify that the PostgreSQL service is properly provisioned
2. Check that the database connection variables are correctly set
3. You may need to manually run migrations by connecting to the Railway CLI:
   ```
   railway login
   railway link
   railway run npx prisma migrate deploy
   ```

### Build Failures

If the build fails:

1. Check the build logs for specific error messages
2. Ensure all environment variables are correctly set
3. Verify that the Dockerfile and railway.json are properly configured

## Updating Your Deployment

To update your deployment after making changes:

1. Push your changes to the GitHub repository
2. Railway will automatically detect the changes and trigger a new deployment
3. Monitor the deployment process in the Railway dashboard

## Scaling Your Application

Railway provides several options for scaling your application:

1. Adjust the number of replicas in the railway.json file
2. Upgrade your Railway plan for more resources
3. Configure auto-scaling based on usage patterns

## Cost Management

Railway offers a free tier with limited usage. To manage costs:

1. Monitor your usage in the Railway dashboard
2. Set up billing alerts
3. Consider optimizing your application for resource efficiency
