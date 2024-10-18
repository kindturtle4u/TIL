package study.mybatis;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@SpringBootApplication
public class MybatisApplication {
	public static void main(String[] args) {
		log.trace("TRACE!!");
		log.debug("DEBUG!!");
		log.info("INFO!!");
		log.warn("WARN!!");
		log.error("ERROR!!");
		SpringApplication.run(MybatisApplication.class, args);
	}
}
