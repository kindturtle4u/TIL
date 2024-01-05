package hellojpa;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import java.util.List;

public class JpaMain {
    public static void main(String[] args) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("hello");


        EntityManager em = emf.createEntityManager();
        EntityTransaction tx = em.getTransaction();
        tx.begin();

        //code
        try {
            em.createNativeQuery("""
                    SELECT MEMBER_ID, AGE, TEAM_ID, NAME FROM MEMBER WHERE NAME = 'kim'
                    """).getResultList();

            List<Member> resultList = em.createQuery("""
                            select m
                            from Member m
                            where m.username
                            like '%kim%'
                            """,
                    Member.class
            ).getResultList();

            tx.commit();

//            Child child1 = new Child();/Users/namsangjae/Library/Java/JavaVirtualMachines/azul-17.0.8.1/Contents/Home/bin/java -agentlib:jdwp=transport=dt_socket,address=127.0.0.1:64081,suspend=y,server=n -javaagent:/Users/namsangjae/Library/Caches/JetBrains/IntelliJIdea2023.3/captureAgent/debugger-agent.jar=file:/private/var/folders/g8/lmt7y_v15lvdyfmg7hvmgvnc0000gn/T/capture.props -Dfile.encoding=UTF-8 -classpath /Users/namsangjae/IdeaProjects/TIL/Spring/인프런_스프링 부트와 JPA 실무 완전 정복_1자바 ORM표준 JPA프로그래밍 - 기본편/practice/ex1-hello-jpa/target/classes:/Users/namsangjae/.m2/repository/org/hibernate/hibernate-entitymanager/5.6.14.Final/hibernate-entitymanager-5.6.14.Final.jar:/Users/namsangjae/.m2/repository/org/jboss/logging/jboss-logging/3.4.3.Final/jboss-logging-3.4.3.Final.jar:/Users/namsangjae/.m2/repository/org/hibernate/hibernate-core/5.6.14.Final/hibernate-core-5.6.14.Final.jar:/Users/namsangjae/.m2/repository/antlr/antlr/2.7.7/antlr-2.7.7.jar:/Users/namsangjae/.m2/repository/org/jboss/jandex/2.4.2.Final/jandex-2.4.2.Final.jar:/Users/namsangjae/.m2/repository/com/fasterxml/classmate/1.5.1/classmate-1.5.1.jar:/Users/namsangjae/.m2/repository/javax/activation/javax.activation-api/1.2.0/javax.activation-api-1.2.0.jar:/Users/namsangjae/.m2/repository/org/glassfish/jaxb/jaxb-runtime/2.3.1/jaxb-runtime-2.3.1.jar:/Users/namsangjae/.m2/repository/org/glassfish/jaxb/txw2/2.3.1/txw2-2.3.1.jar:/Users/namsangjae/.m2/repository/com/sun/istack/istack-commons-runtime/3.0.7/istack-commons-runtime-3.0.7.jar:/Users/namsangjae/.m2/repository/org/jvnet/staxex/stax-ex/1.8/stax-ex-1.8.jar:/Users/namsangjae/.m2/repository/com/sun/xml/fastinfoset/FastInfoset/1.2.15/FastInfoset-1.2.15.jar:/Users/namsangjae/.m2/repository/org/hibernate/common/hibernate-commons-annotations/5.1.2.Final/hibernate-commons-annotations-5.1.2.Final.jar:/Users/namsangjae/.m2/repository/javax/persistence/javax.persistence-api/2.2/javax.persistence-api-2.2.jar:/Users/namsangjae/.m2/repository/net/bytebuddy/byte-buddy/1.12.18/byte-buddy-1.12.18.jar:/Users/namsangjae/.m2/repository/org/jboss/spec/javax/transaction/jboss-transaction-api_1.2_spec/1.1.1.Final/jboss-transaction-api_1.2_spec-1.1.1.Final.jar:/Users/namsangjae/.m2/repository/com/h2database/h2/2.2.224/h2-2.2.224.jar:/Users/namsangjae/.m2/repository/javax/xml/bind/jaxb-api/2.3.0/jaxb-api-2.3.0.jar:/Users/namsangjae/Library/Application Support/JetBrains/Toolbox/apps/IDEA-U/ch-0/233.11799.300/IntelliJ IDEA.app/Contents/lib/idea_rt.jar hellojpa.JpaMain
//Connected to the target VM, address: '127.0.0.1:64081', transport: 'socket'
//12월 20, 2023 12:16:12 오전 org.hibernate.jpa.internal.util.LogHelper logPersistenceUnitInformation
//INFO: HHH000204: Processing PersistenceUnitInfo [name: hello]
//12월 20, 2023 12:16:12 오전 org.hibernate.Version logVersion
//INFO: HHH000412: Hibernate ORM core version 5.6.14.Final
//12월 20, 2023 12:16:12 오전 org.hibernate.annotations.common.reflection.java.JavaReflectionManager <clinit>
//INFO: HCANN000001: Hibernate Commons Annotations {5.1.2.Final}
//12월 20, 2023 12:16:12 오전 org.hibernate.engine.jdbc.connections.internal.DriverManagerConnectionProviderImpl configure
//WARN: HHH10001002: Using Hibernate built-in connection pool (not for production use!)
//12월 20, 2023 12:16:12 오전 org.hibernate.engine.jdbc.connections.internal.DriverManagerConnectionProviderImpl buildCreator
//INFO: HHH10001005: using driver [org.h2.Driver] at URL [jdbc:h2:tcp://localhost/~/test]
//12월 20, 2023 12:16:12 오전 org.hibernate.engine.jdbc.connections.internal.DriverManagerConnectionProviderImpl buildCreator
//INFO: HHH10001001: Connection properties: {password=****, user=sa}
//12월 20, 2023 12:16:12 오전 org.hibernate.engine.jdbc.connections.internal.DriverManagerConnectionProviderImpl buildCreator
//INFO: HHH10001003: Autocommit mode: false
//12월 20, 2023 12:16:12 오전 org.hibernate.engine.jdbc.connections.internal.DriverManagerConnectionProviderImpl$PooledConnections <init>
//INFO: HHH000115: Hibernate connection pool size: 20 (min=1)
//12월 20, 2023 12:16:12 오전 org.hibernate.dialect.Dialect <init>
//INFO: HHH000400: Using dialect: org.hibernate.dialect.H2Dialect
//Hibernate:
//
//    drop table if exists Child CASCADE
//Hibernate:
//
//    drop table if exists Item CASCADE
//Hibernate:
//
//    drop table if exists Locker CASCADE
//Hibernate:
//
//    drop table if exists Member CASCADE
//Hibernate:
//
//    drop table if exists MemberProduct CASCADE
//Hibernate:
//
//    drop table if exists Parent CASCADE
//Hibernate:
//
//    drop table if exists Product CASCADE
//Hibernate:
//
//    drop table if exists Team CASCADE
//Hibernate:
//
//    drop sequence if exists hibernate_sequence
//12월 20, 2023 12:16:13 오전 org.hibernate.resource.transaction.backend.jdbc.internal.DdlTransactionIsolatorNonJtaImpl getIsolatedConnection
//INFO: HHH10001501: Connection obtained from JdbcConnectionAccess [org.hibernate.engine.jdbc.env.internal.JdbcEnvironmentInitiator$ConnectionProviderJdbcConnectionAccess@30e9ca13] for (non-JTA) DDL execution was not in auto-commit mode; the Connection 'local transaction' will be committed and the Connection will be set into auto-commit mode.
//Hibernate: create sequence hibernate_sequence start with 1 increment by 1
//Hibernate:
//
//    create table Child (
//       id bigint not null,
//        name varchar(255),
//        parent_id bigint,
//        primary key (id)
//    )
//Hibernate:
//
//    create table Item (
//       DTYPE varchar(31) not null,
//        id bigint not null,
//        name varchar(255),
//        price integer not null,
//        artist varchar(255),
//        author varchar(255),
//        isbn varchar(255),
//        actor varchar(255),
//        director varchar(255),
//        primary key (id)
//    )
//Hibernate:
//
//    create table Locker (
//       id bigint not null,
//        name varchar(255),
//        primary key (id)
//    )
//Hibernate:
//
//    create table Member (
//       id bigint not null,
//        createdBy varchar(255),
//        createdDate timestamp,
//        lastModifiedBy varchar(255),
//        lastModifiedDate timestamp,
//        city varchar(255),
//        street varchar(255),
//        zipcode varchar(255),
//        USERNAME varchar(255),
//        work_city varchar(255),
//        work_street varchar(255),
//        work_zipcode varchar(255),
//        endDate timestamp,
//        startDate timestamp,
//        LOCKER_ID bigint,
//        TEAM_ID bigint,
//        primary key (id)
//    )
//Hibernate:
//
//    create table MemberProduct (
//       id bigint not null,
//        count integer not null,
//        orderDateTime timestamp,
//        price integer not null,
//        MEMBER_ID bigint,
//        PRODUCT_ID bigint,
//        primary key (id)
//    )
//Hibernate:
//
//    create table Parent (
//       id bigint not null,
//        name varchar(255),
//        primary key (id)
//    )
//Hibernate:
//
//    create table Product (
//       id bigint not null,
//        name varchar(255),
//        primary key (id)
//    )
//Hibernate:
//
//    create table Team (
//       id bigint not null,
//        name varchar(255),
//        primary key (id)
//    )
//Hibernate:
//
//    alter table Child
//       add constraint FKlh67j1n7x7gt59u0pbkwqh6o6
//       foreign key (parent_id)
//       references Parent
//Hibernate:
//
//    alter table Member
//       add constraint FK332130jlg9s5hyeuk7gfgi052
//       foreign key (LOCKER_ID)
//       references Locker
//Hibernate:
//
//    alter table Member
//       add constraint FKl7wsny760hjy6x19kqnduasbm
//       foreign key (TEAM_ID)
//       references Team
//Hibernate:
//
//    alter table MemberProduct
//       add constraint FKjnj8ungt7v35y6lfxuxcrjbbr
//       foreign key (MEMBER_ID)
//       references Member
//Hibernate:
//
//    alter table MemberProduct
//       add constraint FKrgt6jorh7iaec1tae84ljye8c
//       foreign key (PRODUCT_ID)
//       references Product
//12월 20, 2023 12:16:13 오전 org.hibernate.resource.transaction.backend.jdbc.internal.DdlTransactionIsolatorNonJtaImpl getIsolatedConnection
//INFO: HHH10001501: Connection obtained from JdbcConnectionAccess [org.hibernate.engine.jdbc.env.internal.JdbcEnvironmentInitiator$ConnectionProviderJdbcConnectionAccess@e9ef5b6] for (non-JTA) DDL execution was not in auto-commit mode; the Connection 'local transaction' will be committed and the Connection will be set into auto-commit mode.
//12월 20, 2023 12:16:13 오전 org.hibernate.engine.transaction.jta.platform.internal.JtaPlatformInitiator initiateService
//INFO: HHH000490: Using JtaPlatform implementation: [org.hibernate.engine.transaction.jta.platform.internal.NoJtaPlatform]
//Hibernate:
//    /* select
//        m
//    from
//        Member m
//    where
//        m.username like '%kim%'  */ select
//            member0_.id as id1_3_,
//            member0_.createdBy as createdb2_3_,
//            member0_.createdDate as createdd3_3_,
//            member0_.lastModifiedBy as lastmodi4_3_,
//            member0_.lastModifiedDate as lastmodi5_3_,
//            member0_.city as city6_3_,
//            member0_.street as street7_3_,
//            member0_.zipcode as zipcode8_3_,
//            member0_.LOCKER_ID as locker_15_3_,
//            member0_.TEAM_ID as team_id16_3_,
//            member0_.USERNAME as username9_3_,
//            member0_.work_city as work_ci10_3_,
//            member0_.work_street as work_st11_3_,
//            member0_.work_zipcode as work_zi12_3_,
//            member0_.endDate as enddate13_3_,
//            member0_.startDate as startda14_3_
//        from
//            Member member0_
//        where
//            member0_.USERNAME like '%kim%'
//12월 20, 2023 12:16:13 오전 org.hibernate.engine.jdbc.connections.internal.DriverManagerConnectionProviderImpl$PoolState stop
//INFO: HHH10001008: Cleaning up connection pool [jdbc:h2:tcp://localhost/~/test]
//Disconnected from the target VM, address: '127.0.0.1:64081', transport: 'socket'
//
//Process finished with exit code 0
//            Child child2 = new Child();
//
//            Parent parent = new Parent();
//            parent.addChild(child1);
//            parent.addChild(child2);
//            em.persist(parent);
//
//            em.flush();
//            em.clear();
//
//            Parent findParent = em.find(Parent.class, parent.getId());
//            findParent.getChildList().remove(0);
//
//            Child child3 = new Child();
//            findParent.addChild(child3);
//            tx.commit();
//            Movie movie = new Movie();
//            movie.setDirector("aaaa");
//            movie.setActor("bbbb");
//            movie.setPrice(2000);
//            em.persist(movie);
//
//
//            em.flush();
//            em.clear();
//
//            Movie find = em.find(Movie.class, movie.getId());
//            System.out.println("find = " + find);
//
//            tx.commit();
//            Team team = new Team();
//            team.setName("TeamA");
//            em.persist(team);
//
//            Member member = new Member();
//            member.setName("member1");
//            member.setTeam(team);
//            em.persist(member);
//
//            Member member2 = new Member();
//            member2.setName("member2");
//            member2.setTeam(team);
//            em.persist(member2);
//
//            em.flush();
//            em.clear();
//
//            Member findMember = em.find(Member.class, member2.getId());
//            List<Member> members = findMember.getTeam().getMembers();
//
//            for (Member m : members) {
//                System.out.println("m.getName() = " + m.getName());
//            }
//
//            tx.commit();
//            Team team = new Team();
//            team.setName("TeamA");
//            em.persist(team);
//
//            Member member = new Member();
//            member.setName("member1");
//            member.setTeamId(team.getId());
//            em.persist(member);
//
//
//            Member findMember = em.find(Member.class, member.getId());
//            Long findTeamId = findMember.getTeamId();
//            Team findTeam = em.find(Team.class, findTeamId);
//
//            tx.commit();
            //insert
//            Member member = new Member();
//            member.setId(1L);
//            member.setUsername("memberA");
//            member.setRoleType(RoleType.ADMIN);
//            em.persist(member);
//            tx.commit();

            //update
//            Member findMember = em.find(Member.class, 1L);
//            findMember.setName("HelloJPA");
//            tx.commit();

            // delete
//            Member findMember = em.find(Member.class, 1L);
//            em.remove(findMember);
//            tx.commit();

            //JPQL
//            List<Member> result = em.createQuery("select m from Member as m", Member.class)
//                    .getResultList();
//
//            for (Member member : result) {
//                System.out.println("member.getName() = " + member.getName());
//            }

//
//            List<Member> result = em.createQuery("select m from Member as m", Member.class)
//                    .setFirstResult(1)
//                    .setMaxResults(10)
//                    .getResultList();
//
//            for (Member member : result) {
//                System.out.println("member.getName() = " + member.getName());
//            }


        } catch (Exception e) {
            tx.rollback();
        } finally {
            em.close();
        }

        emf.close();
    }
}
