<template>
  <section :class="[ 'slide', id ]">
    <div class="inner">
      <div class="gutter">
        <h2 class="fs-sm gray">{{ title }}</h2>
        <div class="container">
          <div class="content">
            <div class="cols">
              <TeamMember
                v-for="(member, index) in team"
                :name="member.name"
                :position="member.position"
                :socials="member.socials"
                :bio="member.bio"
                :key="index"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

const show_bio_1 = ref(false);
const show_bio_2 = ref(false);

const team = [
  {
    name: 'Matt Wiggins',
    position: 'Founder &times; Director',
    socials: [
      'https://www.linkedin.com/in/matt-wiggins-570b403',
      'https://www.instagram.com/gus_chiggins'
    ],
    bio: {
      copy: [
        'Worked with Laika, Coca-Cola, Dominos, Diesel, Airwalk, Weiden + Kennedy, and so much more.',
        '15+ years of crushin’ code and slammin’ beers.'
      ],
      images: [
        '/images/matt/matt-wiggins-profile.jpg',
        '/images/matt/reporter.jpg',
        '/images/matt/viking.jpg',
        '/images/matt/gabf.jpg',
        '/images/matt/interview.jpg'
      ]
    }
  },
  {
    name: 'Keith Driessen',
    position: 'Lead Developer',
    socials: [
      'https://www.linkedin.com/',
      'https://www.instagram.com/kiproddodger'
    ],
    bio: {
      copy: [
        'BKWLD (1y), Legwork Studio (5y), Freelance (7y), Consume & Create (1y), and now Seek and Deploy.',
        '15+ years of keyboarding smashing. Horror movie fanatic for life.'
      ],
      images: [
        '/images/keith/keith-driessen-profile.jpg',
        '/images/keith/dr-acula.jpg',
        '/images/keith/polaroid.jpg',
        '/images/keith/nose-press.jpg',
        '/images/keith/alley.jpg'
      ]
    }
  }
];
</script>

<style lang='scss'>
section.team {
  .slide-2-next &,
  .slide-2-active & {
    .inner {
      .gutter {
        .container {
          .content {
            .cols {
              .team-member {
                .box {
                  transform: skewY(0deg);
                }

                .meta {
                  opacity: 1;
                  transform: skewY(0deg) translateY(0px);
                }
              }
            }
          }
        }
      }
    }
  }

  .inner {
    .gutter {
      .container {
        .content {
          .cols {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            column-gap: $space-16;
          }
        }
      }
    }
  }

  @include respond-to($tablet) {
    .inner {
      .gutter {
        .container {
          .content {
            .cols {
              column-gap: $space-32;
            }
          }
        }
      }
    }
  }
}
</style>
