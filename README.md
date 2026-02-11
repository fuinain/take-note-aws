## Enviroment
Node version: v22.11.0

## Database - Prisma  
```bash
# init database with prisma
$ npx prisma migrate dev --name init_database

# migra db 
$ npx prisma migrate dev --name <name_migration>

# sync db with schema.prisma (when db is change)
$ npx prisma migrate dev
```