package it.epicode.epimon;

import it.epicode.epimon.entity.Quiz;
import it.epicode.epimon.entity.RegisteredUser;
import it.epicode.epimon.enums.UserRole;
import it.epicode.epimon.repository.QuizRepository;
import it.epicode.epimon.repository.RegisteredUserRepository;
import it.epicode.epimon.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@ComponentScan(basePackages = "it.epicode.epimon")
public class EpimonApplication implements CommandLineRunner {

	@Autowired
	private QuizRepository quizRepository;

	@Autowired
	private RegisteredUserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(EpimonApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		RegisteredUser admin = new RegisteredUser();
		admin.setUsername("admin");
		admin.setPassword(passwordEncoder.encode("admin"));
		admin.setUserRole(UserRole.ADMIN);
		userRepository.save(admin);

		Quiz quiz1 = new Quiz();
		quiz1.setQuestion("There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.");
		quiz1.setAnswer("bulbasaur");
		quiz1.setHint("It has two types.");
		quizRepository.save(quiz1);

		Quiz quiz2 = new Quiz();
		quiz2.setQuestion("Its wings can carry this Pokémon close to an altitude of 4,600 feet. It blows out fire at very high temperatures.");
		quiz2.setAnswer("charizard");
		quiz2.setHint("It's fully evolved.");
		quizRepository.save(quiz2);

		Quiz quiz3 = new Quiz();
		quiz3.setQuestion("It has small electric sacs on both its cheeks. If threatened, it looses electric charges from the sacs.");
		quiz3.setAnswer("pikachu");
		quiz3.setHint("Its pre-evolution is a Baby Pokémon.");
		quizRepository.save(quiz3);

		Quiz quiz4 = new Quiz();
		quiz4.setQuestion("When it retracts its long neck into its shell, it squirts out water with vigorous force.");
		quiz4.setAnswer("squirtle");
		quiz4.setHint("It's a Water type.");
		quizRepository.save(quiz4);

		Quiz quiz5 = new Quiz();
		quiz5.setQuestion("It is said to emerge from darkness to steal the lives of those who become lost in mountains.");
		quiz5.setAnswer("gengar");
		quiz5.setHint("It has red eyes.");
		quizRepository.save(quiz5);

		Quiz quiz6 = new Quiz();
		quiz6.setQuestion("While young, it has six gorgeous tails. When it grows, several new tails are sprouted.");
		quiz6.setAnswer("vulpix");
		quiz6.setHint("It catches its prey using wisps of flame.");
		quizRepository.save(quiz6);

		Quiz quiz7 = new Quiz();
		quiz7.setQuestion("It is constantly wracked by a headache. When the headache turns intense, it begins using mysterious powers.");
		quiz7.setAnswer("psyduck");
		quiz7.setHint("It has one type.");
		quizRepository.save(quiz7);

		Quiz quiz8 = new Quiz();
		quiz8.setQuestion("Rarely seen by people, it is said to be drawn by the full moon to dance and play in quiet mountains.");
		quiz8.setAnswer("clefable");
		quiz8.setHint("It's linked to a famous mountain.");
		quizRepository.save(quiz8);

		Quiz quiz9 = new Quiz();
		quiz9.setQuestion("It can telepathically communicate with people. It changes its appearance using its down that refracts light.");
		quiz9.setAnswer("latias");
		quiz9.setHint("It's known to roam different regions in search of pure-hearted trainers.");
		quizRepository.save(quiz9);

		Quiz quiz10 = new Quiz();
		quiz10.setQuestion("It is said to make any wish come true. It is only awake for only seven days out of a thousand years.");
		quiz10.setAnswer("jirachi");
		quiz10.setHint("It's the only known Pokémon capable of learning the move Doom Desire.");
		quizRepository.save(quiz10);

		Quiz quiz11 = new Quiz();
		quiz11.setQuestion("It has the power to predict the future. Its power peaks when it is protecting its Trainer.");
		quiz11.setAnswer("gardevoir");
		quiz11.setHint("It's capable of creating small black holes at full power.");
		quizRepository.save(quiz11);

		Quiz quiz12 = new Quiz();
		quiz12.setQuestion("When trying to protect someone, it extends its elbows as if they were swords and fights savagely.");
		quiz12.setAnswer("gallade");
		quiz12.setHint("It can only be male.");
		quizRepository.save(quiz12);

		Quiz quiz13 = new Quiz();
		quiz13.setQuestion("It is said that when it rubs its feathers together, lightning will fall immediately after.");
		quiz13.setAnswer("zapdos");
		quiz13.setHint("It likes to rest in abandoned power plants and places rich of electricity.");
		quizRepository.save(quiz13);

		Quiz quiz14 = new Quiz();
		quiz14.setQuestion("Its body is composed of plasma. It is known to infiltrate electronic devices and wreak havoc.");
		quiz14.setAnswer("rotom");
		quiz14.setHint("They are naturally mischievous, but some of them like to help people.");
		quizRepository.save(quiz14);

		Quiz quiz15 = new Quiz();
		quiz15.setQuestion("It starts its life with a wondrous power that permits it to bond with any kind of Pokémon.");
		quiz15.setAnswer("manaphy");
		quiz15.setHint("Eighty percent of its body is made of water.");
		quizRepository.save(quiz15);

		Quiz quiz16 = new Quiz();
		quiz16.setQuestion("It uses the shapes of auras, which change according to emotion, to communicate with others.");
		quiz16.setAnswer("riolu");
		quiz16.setHint("Its hidden ability is Prankster.");
		quizRepository.save(quiz16);

		Quiz quiz17 = new Quiz();
		quiz17.setQuestion("Known as the Desert Spirit, this Pokémon hides in the sandstorms it causes by beating its wings.");
		quiz17.setAnswer("flygon");
		quiz17.setHint("One of its egg groups is Bug.");
		quizRepository.save(quiz17);

		Quiz quiz18 = new Quiz();
		quiz18.setQuestion("To protect themselves from danger, they hide their true identities by transforming into people and Pokémon.");
		quiz18.setAnswer("zorua");
		quiz18.setHint("It has red patterns.");
		quizRepository.save(quiz18);

		Quiz quiz19 = new Quiz();
		quiz19.setQuestion("Using the feelers on its ears, it can tell how someone is feeling or when an egg might hatch.");
		quiz19.setAnswer("audino");
		quiz19.setHint("It is the only known Pokémon capable of learning Secret Power by leveling up.");
		quizRepository.save(quiz19);

		Quiz quiz20 = new Quiz();
		quiz20.setQuestion("Research revealed that its body is made of Antarctic ice from a past ice age.");
		quiz20.setAnswer("regice");
		quiz20.setHint("It was sealed in ancient ruins by people in the past.");
		quizRepository.save(quiz20);

	}
}
