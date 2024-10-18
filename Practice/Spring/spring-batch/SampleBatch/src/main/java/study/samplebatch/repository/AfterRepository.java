package study.samplebatch.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import study.samplebatch.entity.AfterEntity;

public interface AfterRepository extends JpaRepository<AfterEntity, Long> {
}
