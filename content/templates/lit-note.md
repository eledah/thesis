---
category: literaturenote
tags: {% if allTags %}{{allTags}}{% endif %}
citekey: {{citekey}}
status: unread
dateread: 
date: {{importDate | format("YYYY-MM-DD")}}
creators: 
{%- for creator in creators %}
  - "{{creator.lastName}}, {{creator.firstName}}"
{%- endfor %}
title: "{{title}}"
year: {{date | format("YYYY")}}
bibliography: "{{bibliography}}"
itemType: {% if itemType %}"{{itemType}}"{% endif %}
journal: {% if itemType == "journalArticle" %}"{{publicationTitle}}"{% endif %}
volume: {% if volume %}{{volume}}{% endif %}
issue: {% if issue %}{{issue}}{% endif %}
book: {% if itemType == "bookSection" %}"{{publicationTitle}}"{% endif %}
publisher: {% if publisher %}"{{publisher}}"{% endif %}
location: {% if place %}"{{place}}"{% endif %}
pages: {% if pages %}"{{pages}}"{% endif %}
doi: {% if DOI %}"{{DOI}}"{% endif %}
isbn: {% if ISBN %}"{{ISBN}}"{% endif %}
---

{%- if abstractNote %}
> [!Abstract]
>
> {{abstractNote}}
{%- endif %}

{% set pdf_attachments = attachments | filterby("path", "endswith", ".pdf") %}
{% if pdf_attachments %}
> [!LINK]
>{%- for attachment in pdf_attachments %}
> [{{attachment.title}}](zotero://select/library/items/{{attachment.itemKey}})
{%- endfor %}
{% endif %}


# حاشیه‌نویسی‌ها

## بخش ۱: <mark style="background-color: #ffd400; color: white;">عبارات و اصطلاحات جدید</mark>
{% for a in annotations -%}
{% if a.color == '#ffd400' %}
{%- if a.annotatedText %}
{{a.annotatedText}}
{%- elif a.imageRelativePath %}
**تصویر**

![[{{a.imageRelativePath}}]]
{%- endif %}
{%- if a.comment %}

{{a.comment}}
{%- endif %}

[صفحهٔ {{a.page}}](zotero://open-pdf/library/items/{{a.attachment.itemKey}}?page={{a.page}}&annotation={{a.id}})

---
{% endif %}
{%- endfor %}

## بخش ۲: <mark style="background-color: #ff6666; color: white;">استدلال‌ها</mark>
{% for a in annotations -%}
{% if a.color == '#ff6666' %}
{%- if a.annotatedText %}
{{a.annotatedText}}
{%- elif a.imageRelativePath %}
**تصویر**

![[{{a.imageRelativePath}}]]
{%- endif %}
{%- if a.comment %}

{{a.comment}}
{%- endif %}

[صفحهٔ {{a.page}}](zotero://open-pdf/library/items/{{a.attachment.itemKey}}?page={{a.page}}&annotation={{a.id}})

---
{% endif %}
{%- endfor %}

## بخش ۳: <mark style="background-color: #2ea8e5; color: white;">ارجاعات قابل بررسی</mark>
{% for a in annotations -%}
{% if a.color == '#2ea8e5' %}
{%- if a.annotatedText %}
{{a.annotatedText}}
{%- elif a.imageRelativePath %}
**تصویر**

![[{{a.imageRelativePath}}]]
{%- endif %}
{%- if a.comment %}

{{a.comment}}
{%- endif %}

[صفحهٔ {{a.page}}](zotero://open-pdf/library/items/{{a.attachment.itemKey}}?page={{a.page}}&annotation={{a.id}})

---
{% endif %}
{%- endfor %}

## سایر حاشیه‌نویسی‌ها
{% for a in annotations -%}
{% if a.color and a.color not in ['#ffd400', '#ff6666', '#2ea8e5'] %}
{%- if a.annotatedText %}
<mark style="background-color: {{a.color}}">{{a.annotatedText}}</mark>
{%- elif a.imageRelativePath %}
**تصویر**

![[{{a.imageRelativePath}}]]
{%- endif %}
{%- if a.comment %}

{{a.comment}}
{%- endif %}

[صفحهٔ {{a.page}}](zotero://open-pdf/library/items/{{a.attachment.itemKey}}?page={{a.page}}&annotation={{a.id}})

---
{% endif %}
{%- endfor %}

## یادداشت‌های مستقل
{% for a in annotations -%}
{% if a.comment and not a.color %}
**یادداشت**

{{a.comment}}

[صفحهٔ {{a.page}}](zotero://open-pdf/library/items/{{a.attachment.itemKey}}?page={{a.page}}&annotation={{a.id}})

---
{% endif %}
{%- endfor %}