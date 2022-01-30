

#de imagens....  Imegns download 
FROM node

#directoy to job container
WORKDIR /code


# copy dependency
copy package.json /code/package.json
COPY package-lock.json /code/package-lock.json


# add `/app/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

#run comand to install apps
RUN npm install -g npm  --silent
RUN npm install package.json 


# copy directory local actual to directory in cotainer docker
copy  . /code

#run the point in dev 
CMD [ "npm", "run", "dev" ]      


#
#
#Create Imgens 
#sudo docker build -t appaluracord:1.0 .
#run imagen
#sudo docker run -p 3000:3000 appaluracord:1.0
###############################################
#
#
# docker build -t appaluracord:1.0 .
# docker run -it --rm -v ${PWD}:/code -v node_modules -p 3000:3000 -e CHOKIDAR_USEPOLLING=true appaluracord:1.2
#
#
#
#################

