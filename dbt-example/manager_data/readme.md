docker build -t manager_data .
docker run -it --rm -v "$(pwd)":/app manager_data

