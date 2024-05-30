package credStorage.cred.controller;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
@FeignClient(name = "service1")
public interface Service1Client {
    @GetMapping("/users/findUser/{id}")
    User getUserById(@PathVariable int id);
}
