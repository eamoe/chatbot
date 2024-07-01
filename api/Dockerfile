###########
# BUILDER #
###########

FROM python:3.12-alpine as builder

WORKDIR /usr/src/app

# Prevent Python from writing pyc files to disk and buffer output
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install build dependencies
RUN apk update
# Reduce build time
# && apk add --no-cache build-base

# Check the code with linter
RUN pip install --upgrade pip
RUN pip install flake8
COPY . /usr/src/app
RUN flake8

# Upgrade pip and install dependencies
COPY ./requirements.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /usr/src/app/wheels -r requirements.txt

#########
# FINAL #
#########

FROM python:3.12-alpine

# Define environment variables
ENV APP_HOME=/home/app

# Create application home directory and set working directory
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

# Create a non-root user and group to run the application
RUN addgroup --system app && adduser --system --ingroup app app

# Install runtime dependencies
RUN apk update && apk add --no-cache netcat-openbsd

# Copy wheels and requirements from the builder stage
COPY --from=builder /usr/src/app/wheels /wheels
COPY --from=builder /usr/src/app/requirements.txt .

# Install application dependencies
RUN pip install --upgrade pip && \
    pip install --no-cache /wheels/* && \
    rm -rf /wheels

# Copy application code
COPY . $APP_HOME

# Change ownership of the application directory
RUN chown -R app:app $APP_HOME

# Switch to the non-root user
USER app

# Specify the entry point for the container
CMD ["fastapi", "run", "/home/app/main.py", "--proxy-headers", "--port", "8000"]
#ENTRYPOINT ["python", "/home/app/main.py"]
