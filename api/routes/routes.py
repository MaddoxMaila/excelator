from resources.SheetSubmissionResource import SheetSubmissionResource
from resources.SearchResource import SearchResource
from resources.AdminResource import AdminViewTimeSheetResource
from resources.TimeSheetResources import TimeSheetResource
from resources.AuthResource import AuthUserResource, LoginResource, RegisterResource

'''
    Define routes and resources as Key-Value pairs
'''
routes = {
    '/login'        : LoginResource,
    '/register'     : RegisterResource,
    '/auth'         : AuthUserResource,
    '/timesheet/<string:action>'         : TimeSheetResource, # /save, /update, /delete, /see
    '/admin/timesheet/<int:id>'          : AdminViewTimeSheetResource,
    '/search'                            : SearchResource,
    '/admin/<string:name>'               : SheetSubmissionResource,
}


def register_routes(api) -> None:
    """
    Register routes to their resources

    Args:
        api ([type]): flask_restful Api instance
    """

    for route, routeResource in routes.items():

        '''
            Add the routes and resource to the application
        '''
        api.add_resource(routeResource, route)
