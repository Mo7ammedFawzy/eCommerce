# 04: Complete product update/delete with admin guard and UI wiring

**What to build:** As an admin, I can create, edit, and delete products through the UI and see the catalogue update; as a shopper I can never hit admin endpoints successfully even if I call them directly.

**Blocked by:** 02 (Express router and error handling); needs 03 (auth + roles) for the admin guard.

**Status:** ready-for-agent

- [ ] `productController.updateProduct` and `deleteProduct` implemented: validate id, 404 when missing, return updated/deleted JSON (fixes current empty `updateProduct` and `deleteProduct` that returns nothing); `PUT /:id`, `DELETE /:id`, `POST /`, `POST /bulk` guarded by auth + `Roles.Admin`
- [ ] `addManyProducts` validation fixed (currently pushes valid/invalid inconsistently and reports nothing): per-item errors reported, only valid items inserted, response is 201 with created + rejected lists
- [ ] `productService` sort/filter hardened: unknown sort fields ignored, `limit`/`page` clamped, invalid ObjectId yields 400 not 500; matches what `ProductsFilter`/`ProductsPagination` send
- [ ] Frontend admin path (Dashboard or new admin products view) lets an admin create/edit/delete and shows success/error toasts; shopper UI unchanged and admin controls hidden by role
- [ ] Demoable: admin edits price → product page shows new price; admin deletes → detail page 404s; non-admin `PUT/DELETE` gets 401/403; catalogue pagination/filter still works
