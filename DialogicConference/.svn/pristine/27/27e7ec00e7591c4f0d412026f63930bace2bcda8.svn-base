package dialogicconference




import static org.springframework.http.HttpStatus.*
import grails.converters.JSON
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ConferenceController {

    

    def index() {
        redirect(action: "login")
    }
	def meeting(){
		String userid = params.userid?.toString()?.trim()
		String type = params.type?.toString()?.trim()
		String stun = params.stun?.toString()?.trim()
		String conf = params.conf
		String res = params.res
//		println "userid------->"+userid
		if(!userid){
			redirect(action: "login")
		}
		[userid: userid,conf:conf,stun:stun,type:type,res:res]
	}
	def login() {
		String conf = params.conf
		String stun = params.stun
		String type = params.type
		String res = params.res
		[conf: conf,stun:stun,type:type,res:res]
	}
	def mobileLogin() {
		String conf = params.conf
		String stun = params.stun
		String type = params.type
		String res = params.res
		[conf: conf,stun:stun,type:type,res:res]
	}
	def mobileMeeting(){
		String userid = params.userid?.toString()?.trim()
		String type = params.type?.toString()?.trim()
		String stun = params.stun?.toString()?.trim()
		String conf = params.conf
		String res = params.res
		if(!userid){
			redirect(action: "login")
		}
		[userid: userid,conf:conf,stun:stun,type:type,res:res]
	}
	def screenShare() {
		String userid = params.userid?.toString()?.trim()
		String conf = params.conf
		[userid: userid,conf:conf]
	}
	def logout() {
		session.invalidate()
		redirect(action: "login")
	}
	def mobileLogout() {
		session.invalidate()
		redirect(action: "mobileLogin")
	}
	
//	def encodeUrl(){
//		String type = params.type
//		println "type------->"+type
//		String url = "type="+type
//		String encodedUrl = URLEncoder.encode(url, "UTF-8")
//		println "Encoded URL " + encodedUrl
//		String decodedUrl = URLDecoder.decode(url, "UTF-8")
//		println "Dncoded URL " + decodedUrl
//		def a = [url:encodedUrl]
//		render (a as JSON)
//	}

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'conference.label', default: 'Conference'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
