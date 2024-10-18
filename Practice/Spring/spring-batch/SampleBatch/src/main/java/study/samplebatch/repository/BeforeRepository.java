package study.samplebatch.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import study.samplebatch.entity.BeforeEntity;

public interface BeforeRepository extends JpaRepository<BeforeEntity, Long> {
}
