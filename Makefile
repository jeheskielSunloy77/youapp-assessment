.PHONY: run

run:
	docker-compose up -d && \
	cd frontend && pnpm run dev & \
	cd backend && pnpm run start:dev & 

stop:
	docker-compose down \
	lsof -ti tcp:3000 | xargs kill \
	lsof -ti tcp:8080 | xargs kill  
	