'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// 12 Laws of Success with comprehensive content
const rulesOfSuccess = [
  {
    id: 1,
    imageNumber: 1,
    title: "Foundation",
    subtitle: "A Strong Foundation will Increase your Rank.",
    description: "Just as a skyscraper cannot stand without solid groundwork, your academic success depends entirely on the strength of your foundational knowledge.",
    imagePath: "/blog/images/1.png",
    fullContent: `
      <h2>A Strong Foundation will Increase your Rank</h2>
      <p>A strong foundation will increase your rank. Just as a skyscraper cannot stand without solid groundwork, your academic success depends entirely on the strength of your foundational knowledge. This law emphasizes the critical importance of mastering basics before advancing to complex concepts.</p>
      
      <p>When students rush through fundamental topics, they create gaps in their understanding that become increasingly problematic as they progress. Mathematics students who skip basic algebra struggle with calculus. Language learners who ignore grammar rules find themselves unable to construct meaningful sentences. Science students without foundational principles cannot grasp advanced theories.</p>
      
      <p>Building a strong foundation requires patience and thoroughness. It means resisting the temptation to move forward before you're ready, even when peers seem to be advancing faster. Take time to understand core concepts deeply rather than memorizing superficially. Ask questions until clarity emerges. Practice fundamental skills until they become second nature.</p>
      
      <p>The beauty of a solid foundation is that it makes everything that follows easier. Complex problems become manageable when you can break them down into familiar components. Advanced concepts connect naturally to principles you've already mastered. Your confidence grows because you're building on certainty rather than uncertainty.</p>
      
      <p>Moreover, a strong foundation provides stability during challenging times. When you encounter difficult material, you can rely on your fundamental knowledge to guide you through. This law isn't just about academic success—it's about creating an unshakeable base that supports lifelong learning and achievement.</p>
    `
  },
  {
    id: 2,
    imageNumber: 2,
    title: "Language",
    subtitle: "If you Understand the Problem, Half of It is Already Solved.",
    description: "Language isn't just a tool for communication—it's the framework through which we organize our thoughts and solve problems effectively.",
    imagePath: "/blog/images/2.png",
    fullContent: `
      <h2>If you Understand the Problem, Half of It is Already Solved</h2>
      <p>This law emphasizes the transformative power of clear comprehension and articulation. Language isn't just a tool for communication—it's the framework through which we organize our thoughts, understand complex ideas, and solve problems effectively.</p>
      
      <p>When you can clearly define and articulate a problem using precise language, you demonstrate genuine understanding rather than superficial familiarity. This clarity naturally leads toward solutions because properly formulated problems contain hints about their resolution. Confusion often stems not from the difficulty of concepts themselves but from our inability to express them clearly in our minds.</p>
      
      <p>Developing strong language skills across all subjects—not just in language classes—is essential. In mathematics, understanding what a problem is truly asking determines your approach. In science, precise terminology prevents misunderstandings that could lead to incorrect conclusions. In humanities, the ability to articulate nuanced arguments demonstrates sophisticated thinking. Even in technical fields, explaining concepts clearly indicates mastery.</p>
      
      <p>This law also highlights the importance of asking the right questions. When you're stuck, improving how you formulate your question often reveals the answer. Instead of "Why doesn't this work?" ask "What specific step produces unexpected results?" This precision transforms vague confusion into targeted problem-solving.</p>
      
      <p>Furthermore, strong language skills enable you to access knowledge from various sources—textbooks, lectures, research papers, and discussions—extracting maximum value from each. The better your command of language, the more efficiently you learn and the more effectively you can demonstrate your knowledge to others.</p>
    `
  },
  {
    id: 3,
    imageNumber: 3,
    title: "Surrounding",
    subtitle: "Find Peaceful and Positive Surrounding, It will Increase your Learning Ability.",
    description: "Your environment shapes your mind more profoundly than most people realize. Optimal learning occurs in spaces that support focus and reduce stress.",
    imagePath: "/blog/images/3.png",
    fullContent: `
      <h2>Find Peaceful and Positive Surrounding</h2>
      <p>Your environment shapes your mind more profoundly than most people realize. This law recognizes that optimal learning doesn't occur in chaos but in spaces that support focus, reduce stress, and promote positive mental states.</p>
      
      <p>A peaceful surrounding minimizes distractions that fragment your attention. Every interruption—whether noise, visual clutter, or unexpected disturbances—forces your brain to redirect focus, consuming mental energy and reducing efficiency. Research shows it takes an average of 23 minutes to fully regain concentration after an interruption. A calm environment protects your attention, allowing deep, sustained focus where genuine learning happens.</p>
      
      <p>Positive surroundings extend beyond mere quietness. They include adequate lighting that prevents eye strain, comfortable temperatures that don't distract, organized spaces that reduce visual stress, and aesthetics that inspire rather than depress. Even small elements like plants, natural light, or motivational reminders can significantly impact your mood and motivation.</p>
      
      <p>The psychological impact of your environment cannot be overstated. Studying in a space associated with relaxation (like your bed) confuses your brain's spatial associations, reducing both study effectiveness and sleep quality. Conversely, a dedicated study space creates mental triggers that prepare your brain for focused work the moment you enter.</p>
      
      <p>Your surrounding also includes digital environments. A cluttered desktop, constant notifications, and easy access to entertainment sites create internal distractions as disruptive as external noise. Curating your physical and digital environments isn't perfectionism—it's strategic optimization of your most valuable resource: your attention and mental energy.</p>
    `
  },
  {
    id: 4,
    imageNumber: 4,
    title: "Companionship",
    subtitle: "Stay Around the People Who Share the Same Dream.",
    description: "The people you surround yourself with shape your aspirations, standards, habits, and ultimately your trajectory toward success.",
    imagePath: "/blog/images/4.png",
    fullContent: `
      <h2>Stay Around the People Who Share the Same Dream</h2>
      <p>This law acknowledges that humans are profoundly influenced by their social environment. The people you surround yourself with shape your aspirations, standards, habits, and ultimately your trajectory toward success or mediocrity.</p>
      
      <p>Companionship with like-minded individuals creates positive peer pressure. When your friends prioritize their studies, you're more likely to do the same. When your circle values improvement and growth, you naturally adopt similar values. This isn't about conformity but about being influenced toward your best self by people who share your commitment to excellence.</p>
      
      <p>Like-minded companions provide invaluable support during challenging times. They understand your struggles because they face similar ones. They can offer practical advice, study together effectively, explain difficult concepts from a peer perspective, and provide encouragement when motivation wanes. This mutual support system makes the difficult journey toward success more manageable and less isolating.</p>
      
      <p>Furthermore, surrounding yourself with ambitious peers expands your vision of what's possible. When you regularly interact with people achieving great things, their success becomes normalized rather than exceptional. Your own goals seem more attainable, and you develop the confidence to pursue ambitious targets.</p>
      
      <p>However, this law doesn't mean abandoning friends with different paths. It means being intentional about seeking and maintaining relationships with people who inspire and challenge you to grow. It's about creating a core circle that reinforces your values and supports your journey while remaining open and compassionate toward others. The company you keep either elevates you toward your dreams or anchors you to mediocrity—choose wisely.</p>
    `
  },
  {
    id: 5,
    imageNumber: 5,
    title: "Hard Work",
    subtitle: "There is No Substitute for Hard Work.",
    description: "Despite all strategies and shortcuts, sustained effort remains the non-negotiable foundation of significant achievement.",
    imagePath: "/blog/images/5.png",
    fullContent: `
      <h2>There is No Substitute for Hard Work</h2>
      <p>Thomas Edison said: There is no substitute for hard work. This timeless wisdom from one of history's greatest inventors reminds us that despite all strategies, shortcuts, and innovations, sustained effort remains the non-negotiable foundation of significant achievement.</p>
      
      <p>Hard work means showing up consistently, even when motivation is absent. It's studying when friends are enjoying leisure time. It's persevering through difficult concepts that don't click immediately. It's putting in hours of practice to master skills that seem to come easily to others. Edison himself conducted thousands of experiments before successfully creating the light bulb—his genius was inseparable from his relentless work ethic.</p>
      
      <p>The value of hard work extends beyond the immediate results it produces. The process of working hard builds character, discipline, and resilience—qualities that serve you throughout life. When you push through challenges and achieve goals through sustained effort, you develop self-confidence that no one can take away. You learn that your abilities aren't fixed but can expand through dedication.</p>
      
      <p>Hard work also differentiates those who achieve lasting success from those who briefly shine. Talent might open doors, but hard work keeps them open and creates new opportunities. Many talented individuals fail to reach their potential because they rely on natural ability rather than developing the work ethic necessary for sustained excellence.</p>
      
      <p>However, hard work doesn't mean mindless effort. It requires showing up consistently with full engagement, not just logging hours. Quality matters alongside quantity. The point is that regardless of intelligence, circumstances, or resources, hard work remains the one factor entirely within your control—and the one that most reliably predicts success.</p>
    `
  },
  {
    id: 6,
    imageNumber: 6,
    title: "Smart Work",
    subtitle: "Think! Even God Wants You to Work Smart.",
    description: "While hard work provides the engine for success, smart work provides the steering. Effort without strategy can be wasteful.",
    imagePath: "/blog/images/6.png",
    fullContent: `
      <h2>Think! Even God Wants You to Work Smart</h2>
      <p>While hard work provides the engine for success, smart work provides the steering. This law reminds us that effort without strategy can be wasteful, and that using our intelligence to work efficiently honors both our potential and our time.</p>
      
      <p>Smart work begins with clarity about priorities. Not all tasks deserve equal attention. The Pareto Principle suggests that 80% of results come from 20% of efforts. Smart workers identify which activities yield the greatest returns and focus energy there. They distinguish between urgent and important, between busy work and meaningful progress.</p>
      
      <p>Working smart involves learning efficiently. Instead of passively re-reading textbooks for hours, smart learners use active recall, spaced repetition, and practice testing—methods proven far more effective. They identify their personal peak performance times and schedule demanding cognitive work accordingly. They take strategic breaks to maintain focus rather than pushing through diminishing returns.</p>
      
      <p>Smart work also means leveraging available resources. Why struggle alone when teachers, tutors, study groups, and online resources can clarify confusion quickly? Smart workers aren't too proud to seek help—they recognize that learning from others accelerates their progress. They use technology strategically, employing apps and tools that enhance productivity while avoiding digital distractions.</p>
      
      <p>Furthermore, smart work includes self-awareness. Regular reflection on what's working and what isn't allows for continuous improvement in approach. Smart workers experiment with different techniques, track their results, and adapt accordingly. They understand that working harder on an ineffective strategy doesn't improve outcomes—sometimes you must pause, reassess, and change direction.</p>
    `
  },
  {
    id: 7,
    imageNumber: 7,
    title: "Seek Guidance",
    subtitle: "Do Not Hold Doubts, If You Stuck Somewhere Just Ask.",
    description: "Seeking guidance isn't weakness; it's wisdom. The most successful people have been voracious learners who weren't too proud to ask questions.",
    imagePath: "/blog/images/7.png",
    fullContent: `
      <h2>Do Not Hold Doubts, If You Stuck Somewhere Just Ask</h2>
      <p>This law addresses one of the most common obstacles to learning: the reluctance to admit confusion and seek help. Pride, fear of judgment, or misconceptions about intelligence often prevent students from asking questions—yet this hesitation dramatically limits their potential.</p>
      
      <p>Seeking guidance isn't weakness; it's wisdom. The most successful people throughout history have been voracious learners who weren't too proud to acknowledge what they didn't know. They understood that every expert was once a beginner, and that growth requires moving beyond your current understanding into uncomfortable territory where questions are necessary.</p>
      
      <p>Doubts and confusion are natural parts of learning. They signal that you're engaging with material at the edge of your current understanding—exactly where growth occurs. Holding onto doubts hoping they'll resolve themselves rarely works. More often, unresolved confusion compounds, creating larger knowledge gaps that undermine future learning. Addressing questions promptly prevents this cascade effect.</p>
      
      <p>Asking questions also demonstrates engagement and active learning. Teachers appreciate students who ask thoughtful questions because it shows intellectual curiosity and serious effort. Your questions often benefit other students who had the same confusion but didn't voice it.</p>
      
      <p>Moreover, the act of formulating a question clarifies your thinking. Sometimes, working through how to articulate your confusion helps you identify the answer independently. When it doesn't, you've at least pinpointed the specific gap in your understanding, making the guidance you receive more targeted and valuable.</p>
      
      <p>Remember: every person you consider knowledgeable reached that point by asking countless questions. Seeking guidance accelerates learning, prevents frustration, and opens doors to insights you couldn't reach alone.</p>
    `
  },
  {
    id: 8,
    imageNumber: 8,
    title: "Consistency",
    subtitle: "Success is the Result of Consistent Efforts.",
    description: "Consistency transforms ordinary actions into extraordinary results through the power of compound growth over time.",
    imagePath: "/blog/images/8.png",
    fullContent: `
      <h2>Success is the Result of Consistent Efforts</h2>
      <p>This law captures perhaps the most powerful yet underappreciated principle of achievement: consistency transforms ordinary actions into extraordinary results through the power of compound growth.</p>
      
      <p>Consistency means showing up day after day, maintaining your commitment regardless of temporary setbacks, fluctuating motivation, or lack of immediate results. It's studying for two hours daily rather than cramming for fourteen hours before an exam. It's reviewing material consistently rather than sporadically. It's maintaining discipline through both inspired and uninspired days.</p>
      
      <p>The power of consistency lies in compound effects. Just as compound interest transforms small deposits into significant wealth over time, consistent daily efforts transform modest progress into remarkable achievement. Each day's work builds on previous days, creating momentum that makes subsequent efforts more productive. Neural pathways strengthen with repeated use. Skills develop through accumulated practice. Knowledge integrates through regular engagement.</p>
      
      <p>Consistency also provides psychological benefits. When you maintain consistent habits, you remove the daily decision-making burden of whether to study or not. The habit becomes automatic, conserving willpower for actual studying rather than negotiating with yourself about whether to begin. This automation is why consistent people often accomplish more while appearing to struggle less—they've removed internal friction.</p>
      
      <p>Furthermore, consistency builds identity. Repeated actions shape who you become. When you consistently act like a dedicated student, you don't just perform academic tasks—you become an accomplished learner at your core. This identity shift makes maintaining positive behaviors easier because they align with your self-concept.</p>
      
      <p>Success isn't usually the result of dramatic one-time efforts but the inevitable outcome of small, consistent actions repeated over extended periods.</p>
    `
  },
  {
    id: 9,
    imageNumber: 9,
    title: "Stay Motivated",
    subtitle: "Do Something Everyday That Inspires You.",
    description: "While discipline carries you through uninspired days, inspiration fuels the passion that makes the journey meaningful.",
    imagePath: "/blog/images/9.png",
    fullContent: `
      <h2>Do Something Everyday That Inspires You</h2>
      <p>This law addresses the crucial element that sustains all the others: motivation. While discipline carries you through uninspired days, inspiration fuels the passion that makes the journey meaningful rather than merely endurable.</p>
      
      <p>Motivation isn't a constant state—it fluctuates naturally. However, you can actively cultivate it rather than waiting for it to appear spontaneously. Doing something inspiring daily—reading about people you admire, engaging with ideas that excite you, practicing skills you love, or reflecting on your progress—keeps the flame of motivation burning even during challenging periods.</p>
      
      <p>Daily inspiration serves multiple purposes. It reminds you why you began this journey, reconnecting you with your larger purpose when you're lost in tedious details. It provides emotional energy that discipline alone cannot supply. It makes the process enjoyable, transforming what could be a grinding obligation into an engaging pursuit.</p>
      
      <p>Staying motivated also requires celebrating progress. Acknowledge small victories daily rather than postponing recognition until major milestones. This positive reinforcement trains your brain to associate studying with reward, creating positive feedback loops that sustain effort.</p>
      
      <p>Additionally, maintaining motivation involves protecting your vision from negativity. Limit exposure to discouragement while surrounding yourself with uplifting influences. Visualize your goals regularly, making them vivid and emotionally compelling rather than abstract concepts.</p>
      
      <p>Remember that motivation and action have a reciprocal relationship. While inspiration can spark action, action also generates motivation. Sometimes the best way to feel motivated is simply to begin—momentum creates enthusiasm. By doing something inspiring daily, you ensure that even on difficult days, your connection to purpose remains strong, carrying you forward toward your dreams.</p>
    `
  },
  {
    id: 10,
    imageNumber: 10,
    title: "Exercise",
    subtitle: "A Strong Body Makes the Mind Strong.",
    description: "Physical activity enhances memory formation, improves concentration, and boosts cognitive processing speed significantly.",
    imagePath: "/blog/images/10.png",
    fullContent: `
      <h2>A Strong Body Makes the Mind Strong</h2>
      <p>This profound connection between physical and mental health has been recognized throughout history, yet it's often overlooked by students focused solely on academic pursuits. Exercise is not a distraction from your studies—it's an essential component of academic excellence.</p>
      
      <p>Physical activity triggers numerous beneficial changes in the brain. It increases blood flow, delivering more oxygen and nutrients to brain cells. It stimulates the production of brain-derived neurotrophic factor (BDNF), which promotes the growth of new neurons and strengthens existing neural connections. Regular exercise enhances memory formation, improves concentration, and boosts cognitive processing speed.</p>
      
      <p>Beyond the biological benefits, exercise provides crucial mental health support. It reduces stress hormones like cortisol while increasing endorphins—natural mood elevators. Students who exercise regularly report better sleep quality, reduced anxiety, and improved ability to handle academic pressure. The discipline required to maintain an exercise routine also translates into better study habits and time management.</p>
      
      <p>You don't need to become an athlete to reap these benefits. Even moderate activities like brisk walking, cycling, or dancing for 30 minutes daily can significantly enhance cognitive function. The key is consistency and finding activities you enjoy, making exercise a sustainable part of your routine rather than a temporary effort.</p>
      
      <p>Think of exercise as sharpening your most important tool—your mind. Just as you wouldn't use a dull blade for precision work, don't expect peak mental performance from a body deprived of physical activity.</p>
    `
  },
  {
    id: 11,
    imageNumber: 11,
    title: "Prayer",
    subtitle: "Prayer Gives Us Hope, Wisdom, and Guidance.",
    description: "Spiritual grounding provides an anchor that keeps us steady through storms of doubt, pressure, and uncertainty in academic pursuit.",
    imagePath: "/blog/images/11.png",
    fullContent: `
      <h2>Prayer Gives Us Hope, Wisdom, and Guidance</h2>
      <p>In the challenging journey of academic pursuit, spiritual grounding provides an anchor that keeps us steady through storms of doubt, pressure, and uncertainty. This law recognizes that success encompasses more than intellectual achievement—it requires inner peace and purpose.</p>
      
      <p>Prayer, regardless of your specific faith tradition, serves multiple vital functions. It creates moments of stillness in our hectic lives, allowing us to step back from immediate pressures and gain perspective. During prayer or meditation, we reconnect with our deeper values and remember why we're pursuing our goals. This reflection prevents us from becoming lost in the endless cycle of tasks and deadlines.</p>
      
      <p>The act of prayer cultivates humility and gratitude—qualities essential for genuine learning. When we acknowledge that we don't have all the answers, we become more receptive to knowledge and wisdom from various sources. Gratitude for our opportunities, abilities, and support systems motivates us to make the most of our circumstances rather than taking them for granted.</p>
      
      <p>Prayer also provides emotional resilience. When facing seemingly insurmountable challenges, the practice of prayer offers comfort and renews our determination. It reminds us that we're part of something larger than our immediate struggles, providing hope when results aren't immediately visible.</p>
      
      <p>Furthermore, prayer develops patience and trust in the process. Success rarely follows a linear path, and prayer helps us accept setbacks as part of our growth journey. It teaches us to persist with faith, knowing that consistent effort aligned with purpose ultimately yields results.</p>
    `
  },
  {
    id: 12,
    imageNumber: 12,
    title: "Repeat & Revise",
    subtitle: "You Must Repeat These Principles and Revise your Studies Everyday.",
    description: "Knowledge requires repetition to become permanent. The human brain is designed to forget information that isn't regularly reinforced.",
    imagePath: "/blog/images/12.png",
    fullContent: `
      <h2>You Must Repeat These Principles and Revise your Studies Everyday</h2>
      <p>This law captures one of the most fundamental truths about learning: knowledge requires repetition to become permanent. The human brain is designed to forget information that isn't regularly reinforced, making consistent review non-negotiable for academic success.</p>
      
      <p>Repetition works through a process called spaced repetition, where reviewing material at increasing intervals strengthens neural pathways and transfers information from short-term to long-term memory. Each time you revisit a concept, you don't just maintain your memory—you deepen your understanding, notice new connections, and integrate the knowledge more fully into your cognitive framework.</p>
      
      <p>Revision isn't simply re-reading notes passively. Effective revision involves active engagement: testing yourself, explaining concepts aloud, teaching material to others, applying principles to new problems, and creating connections between different topics. This active approach forces your brain to retrieve and reconstruct information, which significantly strengthens memory compared to passive review.</p>
      
      <p>The daily aspect of this law is crucial. Small, consistent review sessions are far more effective than marathon cramming sessions before exams. Daily revision prevents the overwhelming buildup of material and keeps information fresh and accessible. It also reveals gaps in understanding early, when they're easier to address.</p>
      
      <p>Moreover, regular revision builds confidence. As concepts become increasingly familiar through repetition, your anxiety decreases and your ability to apply knowledge improves. You develop a comprehensive understanding that allows you to tackle complex problems and think critically rather than simply recalling isolated facts.</p>
    `
  },
];

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function RulePage({ params }: PageProps) {
  // Unwrap params using React.use() for Next.js 15 compatibility
  const { id } = use(params);
  
  // Extract rule number from id (e.g., "rule-1" -> 1)
  const ruleNumber = id.startsWith('rule-') ? 
    parseInt(id.replace('rule-', '')) : 
    parseInt(id);
  
  const rule = rulesOfSuccess.find(r => r.id === ruleNumber);
  
  if (!rule) {
    notFound();
  }

  const nextRule = rulesOfSuccess.find(r => r.id === ruleNumber + 1);
  const prevRule = rulesOfSuccess.find(r => r.id === ruleNumber - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-brand-600 to-brand-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-semibold">Law {rule.imageNumber} of 12</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {rule.title}
            </h1>
            <p className="text-xl sm:text-2xl text-brand-100 mb-6">
              {rule.subtitle}
            </p>
            <p className="text-lg text-brand-50 max-w-2xl mx-auto">
              {rule.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Image */}
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 shadow-2xl bg-gradient-to-br from-brand-50 to-gray-100">
          <Image
            src={rule.imagePath}
            alt={`${rule.title} - Law ${rule.imageNumber}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div 
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: rule.fullContent }}
          />
        </article>

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            {prevRule ? (
              <Link
                href={`/blog/rule-${prevRule.id}`}
                className="flex items-center space-x-3 text-brand-600 hover:text-brand-700 transition-colors group"
              >
                <div className="bg-brand-100 rounded-full p-2 group-hover:bg-brand-200 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Previous Law</p>
                  <p className="font-semibold">{prevRule.title}</p>
                </div>
              </Link>
            ) : (
              <div></div>
            )}

            <Link
              href="/blog"
              className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
            >
              All Laws
            </Link>

            {nextRule ? (
              <Link
                href={`/blog/rule-${nextRule.id}`}
                className="flex items-center space-x-3 text-brand-600 hover:text-brand-700 transition-colors group"
              >
                <div>
                  <p className="text-sm text-gray-500 text-right">Next Law</p>
                  <p className="font-semibold">{nextRule.title}</p>
                </div>
                <div className="bg-brand-100 rounded-full p-2 group-hover:bg-brand-200 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-brand-50 to-green-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Apply This Law?
          </h3>
          <p className="text-gray-600 mb-6">
            Join Ameen Classes and learn how to implement these success principles in your academic journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/premium"
              className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Explore Courses
            </Link>
            <Link
              href="/mock-tests"
              className="bg-white hover:bg-gray-50 text-brand-600 border-2 border-brand-600 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Take Mock Test
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}