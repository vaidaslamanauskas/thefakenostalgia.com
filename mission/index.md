---
layout: default
title: MISSION
---

<section class="Horiyoshi">

  {% for post in site.posts limit: 6 %}
  <article class="Horiyoshi-III">

    <time class="Horiyoshi-irezumi" datetime="{{ post.date | date: "%F" }}">{{ post.date | date: "%b %-d" }}</time>

    <a href="{{ post.url }}/#main" class="Horiyoshi-IV" {% if post.exhibitBackground %} style="background-color: {{ post.exhibitBackground }}" {% endif %}>

      {% if post.fossilOne %}
      <section class="Horiyoshi-V"{% if post.exhibitBackground == "#000" %} style="border-color: grey"{% endif %}>
        <img data-src="{{ post.fossilOne }}" src="{{ post.fossilOne }}" class="Horiyoshi-VI  lazy-load" alt="{{ post.title }}'s website screenshot">
      </section>
      {% endif %}

      {% if post.fossilTwo %}
      <section class="Horiyoshi-V"{% if post.exhibitBackground == "#000" %} style="border-color: grey"{% endif %}>
        <img data-src="{{ post.fossilTwo }}" src="{{ post.fossilTwo }}" class="Horiyoshi-VI  lazy-load" alt="{{ post.title }}'s website screenshot">
      </section>
      {% endif %}

      {% if post.fossilThree %}
      <section class="Horiyoshi-V"{% if post.exhibitBackground == "#000" %} style="border-color: grey"{% endif %}>
        <img data-src="{{ post.fossilThree }}" src="{{ post.fossilThree }}" class="Horiyoshi-VI  lazy-load" alt="{{ post.title }}'s website screenshot">
      </section>
      {% endif %}

      <section class="Horiyoshi-V  Horiyoshi-VROSA">
        <img src="/vectors/ROSA.svg" class="Horiyoshi-VI" alt="">
      </section>

    </a>
  </article>
  {% endfor %}

</section>