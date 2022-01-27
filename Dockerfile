

#de imagens....  Imegns download 
FROM node

#directoy to job container
WORKDIR /home/app


# copy dependency
copy package.json .

#run comand to install apps
RUN npm install -g npm
RUN npm install package.json

# copy directory local actual to directory in cotainer docker
copy  . .

#run the point in dev 
ENTRYPOINT npm run dev       


#
#
#Create Imgens 
#sudo docker build -t appaluracord:1.0 .
#run imagen
#sudo docker run -p 3000:3000 appaluracord:1.0
#
#
#
#
#
#
