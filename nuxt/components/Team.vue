<template>
  <section :class="[ 'slide', id ]">
    <div class="inner">
      <div class="gutter">
        <h2 class="fs-sm gray"><span>{{ title }}</span></h2>
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

const team = [
  {
    name: 'Matt Wiggins',
    position: 'Founder &times; Director',
    socials: [
      'https://www.instagram.com/gus_chiggins',
      'https://www.linkedin.com/in/matt-wiggins-570b403'
    ],
    bio: {
      copy: [
        '16+ years as a partner at creative studios (Legwork and Consume & Create) in roles as a developer, technical director and creative director, doing award-winning work with major brands like Nike, Google and Coca-Cola.',
        'Seek and Deploy has always been my dream; an interactive-focused company where we can do things the right way.'
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
      'https://www.instagram.com/kiproddodger',
      'https://www.linkedin.com/in/keith-d-5799a9399'
    ],
    bio: {
      copy: [
        '14+ years of writing cool code at BKWLD (1&nbsp;year), Legwork Studio (5&nbsp;years), Freelance (7&nbsp;years), Consume & Create (1&nbsp;year), and now Seek and Deploy.',
        'Currently writing and directing a short film series called <a href="https://instagram.com/nightbayentertainment" target="_blank" rel="noopener noreferrer">The Nightwalker</a>. 80’s style rock n roll horror, all shot on VHS! And yes, Matt Wiggins stars as the killer in this series.'
      ],
      images: [
        '/images/keith/keith-driessen-profile.jpg',
        '/images/keith/dr-acula.jpg',
        '/images/keith/nose-press.jpg',
        '/images/keith/polaroid.jpg',
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
    opacity: 1;

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
