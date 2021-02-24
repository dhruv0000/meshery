// Package handlers Meshery API.
//
// the purpose of this application is to provide an application
// that is using plain go code to define an API
//
// This should demonstrate all the possible comment annotations
// that are available to turn go code into a fully compliant swagger 2.0 spec
//
//
//     Schemes: http
//     Host: localhost:9081
//     BasePath: /
//     Version: 0.4.27
//     License: Apache-2.0 http://www.apache.org/licenses/LICENSE-2.0.txt
//
//     Consumes:
//     - application/json
//
//     Produces:
//     - application/json
//
//     Security:
//     - token:
//
//     SecurityDefinitions:
//     token:
//          type: JWT
//          name: token
//          in: cookie
//
//
// swagger:meta
package handlers
​
import "github.com/layer5io/meshery/models"
​
// swagger:route GET /api/server/version VersionAPI idversion
// Returns the version of the meshery server
// responses:
//   200: versionResponse
​
// Meshery version related metadata
// swagger:response versionResponse
type versionResponse struct {
	// in:body
	Body Version
}
​
// swagger:route GET /api/providers ProvidersAPI idprovider
// Returns the list of the available providers
// responses:
//   200: providersResponse
​
// List of avaialable providers and their metadata
// swagger:response providersResponse
type providersResponse struct {
	// in:body
	Body map[string]models.ProviderProperties
}
​
// swagger:route GET /api/config/sync ConfigSyncAPI idprovider
// Returns the list of the available providers
// responses:
//   200: prefResponse
//   401: errResp
​
// List of avaialable providers and their metadata
// swagger:response prefResponse
type prefResponse struct {
	// in:body
	Body models.Preference
}

// swagger:route GET /api/user UserInfoAPI idprovider
// Returns the userID and avatar
// responses:
//   200: userInfoResponse
//   401: errResp
​
// User Info
// swagger:response userInfoResponse
type userInfoResponse struct {
	// in:body
	Body models.User
}

// swagger:route GET /api/user/stats UserStatsAPI idprovider
// Returns the userID and avatar
// responses:
//   200: userPrefResponse
//   401: errResp
​
// User Preferences
// swagger:response userPrefResponse
type userPrefResponse struct {
	// in:body
	Body models.Preference
}

// swagger:route GET /api/user/stats UserStatsAPI idprovider
// Returns the userID and avatar
// responses:
//   200: userPrefResponse
//   401: errResp
​
// User Preferences
// swagger:response userPrefResponse
type userPrefResponse struct {
	// in:body
	Body models.Preference
}
