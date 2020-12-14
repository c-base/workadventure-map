<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.4" tiledversion="1.4.3" name="Water" tilewidth="32" tileheight="32" tilecount="10" columns="6">
 <image source="../water.png" width="192" height="32"/>
 <tile id="0">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
  <animation>
   <frame tileid="0" duration="200"/>
   <frame tileid="1" duration="200"/>
   <frame tileid="2" duration="200"/>
   <frame tileid="3" duration="200"/>
   <frame tileid="1" duration="200"/>
   <frame tileid="0" duration="200"/>
   <frame tileid="4" duration="200"/>
   <frame tileid="5" duration="200"/>
  </animation>
 </tile>
</tileset>
