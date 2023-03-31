FROM node:18
WORKDIR /Orm_Sequelize_planilha_de_orçamento
COPY . .
RUN npm install
ENTRYPOINT  npm start 