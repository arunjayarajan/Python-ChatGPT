The backend application is created using python leveraging flask framework. 
The backend application serves are intermediate between frontend and dynamodb(DB).
They are deployed into EKS as docker containers.
The docker containers are stored in Dockerhub.

Commands :

Just use to run the image:
docker run -d -p 5000:5000 surendrang/nausicaa:latest

To run flask in local without docker:
1. activate virt environment
.venv/scripts/activate
2. run the flask app
python -m flask run

------------------------------------------------------

Additional Docker commands

docker build -t surendrang/nausicaa .
docker push surendrang/nausicaa:latest   

docker run -d -p 5000:5000 surendrang/nausicaa:latest

------------------------------------------------------

Generate Automated documentation with sphinx

.\make html 

------------------------------------------------------

SBOM generation
cyclonedx-py -e -o sbom.xml

OSV check
osv-scanner --sbom="C:\Drive D\Devops-ATU\VS code Python\FlaskTesting\PROJECT 2\Group2_Nausicaa\Code\Nausicaa.Green.Initiative.Backend\sbom.xml"


------------------------------------------------------

#to mount aws directory into docker container
#not needed as we are using envir variables to get creds
docker run -v C:/Users/suren/.aws:/root/.aws -d -p 5000:5000 surendrang/nausicaa:latest

docker ps
docker images