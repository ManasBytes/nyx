from django.contrib import admin

from .models import AccessRequest, City, District, Role, State, UserAssignment, Zone

admin.site.register(State)
admin.site.register(District)
admin.site.register(Zone)
admin.site.register(City)
admin.site.register(Role)
admin.site.register(UserAssignment)
admin.site.register(AccessRequest)
